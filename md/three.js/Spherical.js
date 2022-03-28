/**
 * Ref: https://en.wikipedia.org/wiki/Spherical_coordinate_system
 *
 * 极角()是从正y轴测量的。正y轴是向上的。
 * 方位角()是从正z轴测量的。
 */

import * as MathUtils from './MathUtils.js';

class Spherical {

	constructor( radius = 1, phi = 0, theta = 0 ) {

		this.radius = radius;
		this.phi = phi; // 极角
		this.theta = theta; // 方位角

		return this;

	}

	set( radius, phi, theta ) {

		this.radius = radius;
		this.phi = phi;
		this.theta = theta;

		return this;

	}

	copy( other ) {

		this.radius = other.radius;
		this.phi = other.phi;
		this.theta = other.theta;

		return this;

	}

	// 限制phi在EPS和PI-EPS之间
	makeSafe() {

		const EPS = 0.000001;
		this.phi = Math.max( EPS, Math.min( Math.PI - EPS, this.phi ) );

		return this;

	}

	setFromVector3( v ) {

		return this.setFromCartesianCoords( v.x, v.y, v.z );

	}

	setFromCartesianCoords( x, y, z ) {

		this.radius = Math.sqrt( x * x + y * y + z * z );

		if ( this.radius === 0 ) {

			this.theta = 0;
			this.phi = 0;

		} else {

			this.theta = Math.atan2( x, z );
			this.phi = Math.acos( MathUtils.clamp( y / this.radius, - 1, 1 ) );

		}

		return this;

	}

	clone() {

		return new this.constructor().copy( this );

	}

}

export { Spherical };




// setFromSpherical( s ) {

// 	return this.setFromSphericalCoords( s.radius, s.phi, s.theta );

// }

// setFromSphericalCoords( radius, phi, theta ) {

// 	const sinPhiRadius = Math.sin( phi ) * radius;

// 	this.x = sinPhiRadius * Math.sin( theta );
// 	this.y = Math.cos( phi ) * radius;
// 	this.z = sinPhiRadius * Math.cos( theta );

// 	return this;

// }