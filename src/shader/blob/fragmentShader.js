const fragmentShader = `

uniform float uTime;
uniform vec2 uMouse;
uniform float uPointerSize;
uniform sampler2D texture01;
uniform vec4 uResolution;
uniform float dispersionOffset;
uniform float divideFactor;
uniform int count;
uniform float uSize;
uniform sampler2D uNoiseTexture;
uniform float uIOR;
uniform float uDispersion;
uniform float uRefract;
uniform float uChromaticAberration;
uniform sampler2D uTexture;
uniform samplerCube iChannel0;
uniform float uReflection;
uniform vec3 uCamPos;
uniform mat4 uCamToWorldMat;
uniform mat4 uCamInverseModelMat;
uniform float uSaturation;
varying vec2 vUv;
varying vec4 vPosition;
varying vec4 vRayOrigin;
varying vec3 vHitPos;

const float PI = 3.1415926;
const float HALF_PI = 0.5 * PI;
const float TWO_PI = 2.0 * PI;
const int LOOP = 16;

#define MAX_STEPS 100
#define MAX_DIST 40.
#define SURF_DIST 1e-3
#define samples 32
#define LOD 

float hash(in float v) { return fract(sin(v)*43237.5324); }
vec3 hash3(in float v) { return vec3(hash(v), hash(v*99.), hash(v*9999.)); }

float sphere(in vec3 p, in float r) { 
    float d = length(p) - r; 

    // texture displacement
    // vec2 uv = vec2(atan(p.x, p.z) / TWO_PI, p.y / 5.);
    // vec2 uv = vec2(0.5 + atan(p.z, p.x) / (2.0 * PI), 0.5 - asin(p.y) / PI);
    // float noise = texture2D(uNoiseTexture, uv).r;
    // float displacement = sin(p.x * 15.0 + uTime * 1. + noise) * 0.05;
    // displacement *= smoothstep(.9, -.1, p.y); // reduce displacement at the poles
    // d += displacement;

    return d;
    }

float opSmoothUnion( float d1, float d2, float k ) {
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h);
}

float opSmoothSubtraction(float d1, float d2, float k) {
    float h = clamp(0.5 - 0.5 * (d2 + d1) / k, 0.0, 1.0);
    return mix(d2, -d1, h) + k * h * (1.0 - h);
}

#define BALL_NUM 5

float cylinder(vec3 p, float radius, float height) {
    vec2 d = abs(vec2(length(p.yx), p.z)) - vec2(radius, height);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}

float GetDist(vec3 p) {
	float d = 1e5;

	vec3 mousePos = vec3(uMouse.x * (uResolution.x/uResolution.y) * 0.5, uMouse.y * 0.5, 0.0);
    float dMouse = cylinder(p - mousePos, uPointerSize * 1., 1.0);

	for(int i = 0; i < BALL_NUM; i++) {
		float fi = float(i) + 0.01;
		float r = uSize * 0.1;
		// float r = uSize * 0.1 * hash(fi);
		vec3 offset = .5 * sin(hash3(fi)) * cos(uTime + float(i));
		d = opSmoothUnion(d, sphere(p - offset, r), 0.3);
	}
	d = opSmoothSubtraction(dMouse, d, 0.18);
	// d = opSmoothUnion(d, dMouse, 0.4);
	return d;
}

float Raymarch(vec3 ro, vec3 rd) {
	float dO = 0.;
	float dS;
	for (int i = 0; i < MAX_STEPS; i++) {
		vec3 p = ro + rd * dO;
		dS = GetDist(p);
		dO += dS;
		if (dS < SURF_DIST || dO > MAX_DIST) break;
	}
	return dO;
}

vec3 GetNormal(in vec3 p) {
	vec2 e = vec2(1., -1.) * 1e-3;
    return normalize(
    	e.xyy * GetDist(p+e.xyy)+
    	e.yxy * GetDist(p+e.yxy)+
    	e.yyx * GetDist(p+e.yyx)+
    	e.xxx * GetDist(p+e.xxx)
    );
}

vec3 sat(vec3 rgb, float intensity) {
  vec3 L = vec3(0.2125, 0.7154, 0.0721);
  vec3 grayscale = vec3(dot(rgb, L));
  return mix(grayscale, rgb, intensity);
}

	void main() {

		float iorRatio = uIOR;
		float aspect = uResolution.x / uResolution.y;
		vec2 uv = vUv.xy;
		vec3 ro = vRayOrigin.xyz;
		vec3 hitPos = vec3(vHitPos.x * aspect, vHitPos.y, vHitPos.z);
		vec3 rd = normalize(hitPos - ro); 

		float d = Raymarch(ro, rd);

		vec3 color = vec3(0.0);

		if ( d >= MAX_DIST )
			discard;
		else {
			vec3 p = ro + rd * d;
			vec3 n = GetNormal(p);

			vec3 ref = reflect(rd, n);
        	vec3 refOutside = textureCube(iChannel0, ref).rgb;

			float iorRatioRed = iorRatio + uDispersion;
    		float iorRatioGreen = iorRatio;
    		float iorRatioBlue = iorRatio - uDispersion;

			for ( int i = 0; i < LOOP; i ++ ) {

 				float slide = float(i) / float(LOOP) * 0.1;

				vec3 refractVecR = refract(rd, n, iorRatioRed);
				vec3 refractVecG = refract(rd, n, iorRatioGreen);
				vec3 refractVecB = refract(rd, n, iorRatioBlue);
		
				// color.r += textureCube(iChannel0, refractVecR * (uRefract + slide * 1.0) + uChromaticAberration).r;
				// color.g += textureCube(iChannel0, refractVecG * (uRefract + slide * 2.0) + uChromaticAberration).g;
				// color.b += textureCube(iChannel0, refractVecB * (uRefract + slide * 3.0) + uChromaticAberration).b;
				// color.r += texture2D(uTexture, (refractVecR * (uRefract + slide * 1.0) + uChromaticAberration).xy).r;
				// color.g += texture2D(uTexture, (refractVecG * (uRefract + slide * 2.0) + uChromaticAberration).xy).g;
				// color.b += texture2D(uTexture, (refractVecB * (uRefract + slide * 3.0) + uChromaticAberration).xy).b;
				// color.r += texture2D(uTexture, uv + (refractVecR * (uRefract + slide * 1.0) + uChromaticAberration).xy).r;
				// color.g += texture2D(uTexture, uv + (refractVecG * (uRefract + slide * 2.0) + uChromaticAberration).xy).g;
				// color.b += texture2D(uTexture, uv + (refractVecB * (uRefract + slide * 3.0) + uChromaticAberration).xy).b;
				color.r += texture2D(uTexture, uv + (refractVecR * slide * 1.0 + uChromaticAberration).xy).r;
				color.g += texture2D(uTexture, uv + (refractVecG * slide * 2.0 + uChromaticAberration).xy).g;
				color.b += texture2D(uTexture, uv + (refractVecB * slide * 3.0 + uChromaticAberration).xy).b;

				color = sat(color, uSaturation);
			}
		color /= float( LOOP );

		// fresnel
        float fresnel = pow(1. + dot(rd, n), uReflection);

        color = mix(color, refOutside, fresnel); 
        
		color = pow(color, vec3(.465));
		gl_FragColor = vec4(color, 1.0);
		}
	}
`
export default fragmentShader
