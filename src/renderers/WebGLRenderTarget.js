/**
 * @author szimek / https://github.com/szimek/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.WebGLRenderTarget = function ( width, height, options ) {

	this.uuid = THREE.Math.generateUUID();

	this.width = width;
	this.height = height;

	options = options || {};

	this.texture = options.texture;
	if (!this.texture) {
		this.texture = {
			uuid: THREE.Math.generateUUID(),
			wrapS: options.wrapS !== undefined ? options.wrapS : THREE.ClampToEdgeWrapping,
			wrapT: options.wrapT !== undefined ? options.wrapT : THREE.ClampToEdgeWrapping,
			magFilter: options.magFilter !== undefined ? options.magFilter : THREE.LinearFilter,
			minFilter: options.minFilter !== undefined ? options.minFilter : THREE.LinearMipMapLinearFilter,
			anisotropy: options.anisotropy !== undefined ? options.anisotropy : 1,
			offset: new THREE.Vector2( 0, 0 ),
			repeat: new THREE.Vector2( 1, 1 ),
			format: options.format !== undefined ? options.format : THREE.RGBAFormat,
			type: options.type !== undefined ? options.type : THREE.UnsignedByteType,
			clone: function () {
				return this.copy.apply({ uuid: THREE.Math.generateUUID() }, [this]);
			},
			copy: function (source) {
				this.wrapS = source.wrapS;
				this.wrapT = source.wrapT;

				this.magFilter = source.magFilter;
				this.minFilter = source.minFilter;

				this.anisotropy = source.anisotropy;

				this.format = source.format;
				this.type = source.type;

				this.offset = source.offset.clone();
				this.repeat = source.repeat.clone();

				return this;

			}
		};
	}
	this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
	this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : true;
	this.depthTexture = options.depthTexture;

	this.generateMipmaps = true;

	this.shareDepthFrom = options.shareDepthFrom !== undefined ? options.shareDepthFrom : null;

};

THREE.WebGLRenderTarget.prototype = {

	constructor: THREE.WebGLRenderTarget,

	setSize: function ( width, height ) {

		if ( this.width !== width || this.height !== height ) {

			this.width = width;
			this.height = height;

			this.dispose();

		}

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( source ) {

		this.width = source.width;
		this.height = source.height;

		this.depthBuffer = source.depthBuffer;
		this.stencilBuffer = source.stencilBuffer;
		this.texture = this.texture.clone();
    if (this.depthTexture) this.depthTexture = this.depthTexture.clone();

		this.generateMipmaps = source.generateMipmaps;

		this.shareDepthFrom = source.shareDepthFrom;

		return this;

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

};

THREE.EventDispatcher.prototype.apply( THREE.WebGLRenderTarget.prototype );
