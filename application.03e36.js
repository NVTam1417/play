System.register([], function (_export, _context) {
    "use strict";
  
    var cc, Application;
  
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
  
    // Copy from here
    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
  
    /* Jake add
      CryptoJS v3.1.2
      code.google.com/p/crypto-js
      (c) 2009-2013 by Jeff Mott. All rights reserved.
      code.google.com/p/crypto-js/wiki/License
      */
    var CryptoJS = CryptoJS || function (u, p) {
      var d = {}, l = d.lib = {}, s = function () { }, t = l.Base = { extend: function (a) { s.prototype = this; var c = new s; a && c.mixIn(a); c.hasOwnProperty("init") || (c.init = function () { c.$super.init.apply(this, arguments) }); c.init.prototype = c; c.$super = this; return c }, create: function () { var a = this.extend(); a.init.apply(a, arguments); return a }, init: function () { }, mixIn: function (a) { for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]); a.hasOwnProperty("toString") && (this.toString = a.toString) }, clone: function () { return this.init.prototype.extend(this) } },
        r = l.WordArray = t.extend({
          init: function (a, c) { a = this.words = a || []; this.sigBytes = c != p ? c : 4 * a.length }, toString: function (a) { return (a || v).stringify(this) }, concat: function (a) { var c = this.words, e = a.words, j = this.sigBytes; a = a.sigBytes; this.clamp(); if (j % 4) for (var k = 0; k < a; k++)c[j + k >>> 2] |= (e[k >>> 2] >>> 24 - 8 * (k % 4) & 255) << 24 - 8 * ((j + k) % 4); else if (65535 < e.length) for (k = 0; k < a; k += 4)c[j + k >>> 2] = e[k >>> 2]; else c.push.apply(c, e); this.sigBytes += a; return this }, clamp: function () {
            var a = this.words, c = this.sigBytes; a[c >>> 2] &= 4294967295 <<
              32 - 8 * (c % 4); a.length = u.ceil(c / 4)
          }, clone: function () { var a = t.clone.call(this); a.words = this.words.slice(0); return a }, random: function (a) { for (var c = [], e = 0; e < a; e += 4)c.push(4294967296 * u.random() | 0); return new r.init(c, a) }
        }), w = d.enc = {}, v = w.Hex = {
          stringify: function (a) { var c = a.words; a = a.sigBytes; for (var e = [], j = 0; j < a; j++) { var k = c[j >>> 2] >>> 24 - 8 * (j % 4) & 255; e.push((k >>> 4).toString(16)); e.push((k & 15).toString(16)) } return e.join("") }, parse: function (a) {
            for (var c = a.length, e = [], j = 0; j < c; j += 2)e[j >>> 3] |= parseInt(a.substr(j,
              2), 16) << 24 - 4 * (j % 8); return new r.init(e, c / 2)
          }
        }, b = w.Latin1 = { stringify: function (a) { var c = a.words; a = a.sigBytes; for (var e = [], j = 0; j < a; j++)e.push(String.fromCharCode(c[j >>> 2] >>> 24 - 8 * (j % 4) & 255)); return e.join("") }, parse: function (a) { for (var c = a.length, e = [], j = 0; j < c; j++)e[j >>> 2] |= (a.charCodeAt(j) & 255) << 24 - 8 * (j % 4); return new r.init(e, c) } }, x = w.Utf8 = { stringify: function (a) { try { return decodeURIComponent(escape(b.stringify(a))) } catch (c) { throw Error("Malformed UTF-8 data"); } }, parse: function (a) { return b.parse(unescape(encodeURIComponent(a))) } },
        q = l.BufferedBlockAlgorithm = t.extend({
          reset: function () { this._data = new r.init; this._nDataBytes = 0 }, _append: function (a) { "string" == typeof a && (a = x.parse(a)); this._data.concat(a); this._nDataBytes += a.sigBytes }, _process: function (a) { var c = this._data, e = c.words, j = c.sigBytes, k = this.blockSize, b = j / (4 * k), b = a ? u.ceil(b) : u.max((b | 0) - this._minBufferSize, 0); a = b * k; j = u.min(4 * a, j); if (a) { for (var q = 0; q < a; q += k)this._doProcessBlock(e, q); q = e.splice(0, a); c.sigBytes -= j } return new r.init(q, j) }, clone: function () {
            var a = t.clone.call(this);
            a._data = this._data.clone(); return a
          }, _minBufferSize: 0
        }); l.Hasher = q.extend({
          cfg: t.extend(), init: function (a) { this.cfg = this.cfg.extend(a); this.reset() }, reset: function () { q.reset.call(this); this._doReset() }, update: function (a) { this._append(a); this._process(); return this }, finalize: function (a) { a && this._append(a); return this._doFinalize() }, blockSize: 16, _createHelper: function (a) { return function (b, e) { return (new a.init(e)).finalize(b) } }, _createHmacHelper: function (a) {
            return function (b, e) {
              return (new n.HMAC.init(a,
                e)).finalize(b)
            }
          }
        }); var n = d.algo = {}; return d
    }(Math);
    (function () {
      var u = CryptoJS, p = u.lib.WordArray; u.enc.Base64 = {
        stringify: function (d) { var l = d.words, p = d.sigBytes, t = this._map; d.clamp(); d = []; for (var r = 0; r < p; r += 3)for (var w = (l[r >>> 2] >>> 24 - 8 * (r % 4) & 255) << 16 | (l[r + 1 >>> 2] >>> 24 - 8 * ((r + 1) % 4) & 255) << 8 | l[r + 2 >>> 2] >>> 24 - 8 * ((r + 2) % 4) & 255, v = 0; 4 > v && r + 0.75 * v < p; v++)d.push(t.charAt(w >>> 6 * (3 - v) & 63)); if (l = t.charAt(64)) for (; d.length % 4;)d.push(l); return d.join("") }, parse: function (d) {
          var l = d.length, s = this._map, t = s.charAt(64); t && (t = d.indexOf(t), -1 != t && (l = t)); for (var t = [], r = 0, w = 0; w <
            l; w++)if (w % 4) { var v = s.indexOf(d.charAt(w - 1)) << 2 * (w % 4), b = s.indexOf(d.charAt(w)) >>> 6 - 2 * (w % 4); t[r >>> 2] |= (v | b) << 24 - 8 * (r % 4); r++ } return p.create(t, r)
        }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      }
    })();
    (function (u) {
      function p(b, n, a, c, e, j, k) { b = b + (n & a | ~n & c) + e + k; return (b << j | b >>> 32 - j) + n } function d(b, n, a, c, e, j, k) { b = b + (n & c | a & ~c) + e + k; return (b << j | b >>> 32 - j) + n } function l(b, n, a, c, e, j, k) { b = b + (n ^ a ^ c) + e + k; return (b << j | b >>> 32 - j) + n } function s(b, n, a, c, e, j, k) { b = b + (a ^ (n | ~c)) + e + k; return (b << j | b >>> 32 - j) + n } for (var t = CryptoJS, r = t.lib, w = r.WordArray, v = r.Hasher, r = t.algo, b = [], x = 0; 64 > x; x++)b[x] = 4294967296 * u.abs(u.sin(x + 1)) | 0; r = r.MD5 = v.extend({
        _doReset: function () { this._hash = new w.init([1732584193, 4023233417, 2562383102, 271733878]) },
        _doProcessBlock: function (q, n) {
          for (var a = 0; 16 > a; a++) { var c = n + a, e = q[c]; q[c] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360 } var a = this._hash.words, c = q[n + 0], e = q[n + 1], j = q[n + 2], k = q[n + 3], z = q[n + 4], r = q[n + 5], t = q[n + 6], w = q[n + 7], v = q[n + 8], A = q[n + 9], B = q[n + 10], C = q[n + 11], u = q[n + 12], D = q[n + 13], E = q[n + 14], x = q[n + 15], f = a[0], m = a[1], g = a[2], h = a[3], f = p(f, m, g, h, c, 7, b[0]), h = p(h, f, m, g, e, 12, b[1]), g = p(g, h, f, m, j, 17, b[2]), m = p(m, g, h, f, k, 22, b[3]), f = p(f, m, g, h, z, 7, b[4]), h = p(h, f, m, g, r, 12, b[5]), g = p(g, h, f, m, t, 17, b[6]), m = p(m, g, h, f, w, 22, b[7]),
            f = p(f, m, g, h, v, 7, b[8]), h = p(h, f, m, g, A, 12, b[9]), g = p(g, h, f, m, B, 17, b[10]), m = p(m, g, h, f, C, 22, b[11]), f = p(f, m, g, h, u, 7, b[12]), h = p(h, f, m, g, D, 12, b[13]), g = p(g, h, f, m, E, 17, b[14]), m = p(m, g, h, f, x, 22, b[15]), f = d(f, m, g, h, e, 5, b[16]), h = d(h, f, m, g, t, 9, b[17]), g = d(g, h, f, m, C, 14, b[18]), m = d(m, g, h, f, c, 20, b[19]), f = d(f, m, g, h, r, 5, b[20]), h = d(h, f, m, g, B, 9, b[21]), g = d(g, h, f, m, x, 14, b[22]), m = d(m, g, h, f, z, 20, b[23]), f = d(f, m, g, h, A, 5, b[24]), h = d(h, f, m, g, E, 9, b[25]), g = d(g, h, f, m, k, 14, b[26]), m = d(m, g, h, f, v, 20, b[27]), f = d(f, m, g, h, D, 5, b[28]), h = d(h, f,
              m, g, j, 9, b[29]), g = d(g, h, f, m, w, 14, b[30]), m = d(m, g, h, f, u, 20, b[31]), f = l(f, m, g, h, r, 4, b[32]), h = l(h, f, m, g, v, 11, b[33]), g = l(g, h, f, m, C, 16, b[34]), m = l(m, g, h, f, E, 23, b[35]), f = l(f, m, g, h, e, 4, b[36]), h = l(h, f, m, g, z, 11, b[37]), g = l(g, h, f, m, w, 16, b[38]), m = l(m, g, h, f, B, 23, b[39]), f = l(f, m, g, h, D, 4, b[40]), h = l(h, f, m, g, c, 11, b[41]), g = l(g, h, f, m, k, 16, b[42]), m = l(m, g, h, f, t, 23, b[43]), f = l(f, m, g, h, A, 4, b[44]), h = l(h, f, m, g, u, 11, b[45]), g = l(g, h, f, m, x, 16, b[46]), m = l(m, g, h, f, j, 23, b[47]), f = s(f, m, g, h, c, 6, b[48]), h = s(h, f, m, g, w, 10, b[49]), g = s(g, h, f, m,
                E, 15, b[50]), m = s(m, g, h, f, r, 21, b[51]), f = s(f, m, g, h, u, 6, b[52]), h = s(h, f, m, g, k, 10, b[53]), g = s(g, h, f, m, B, 15, b[54]), m = s(m, g, h, f, e, 21, b[55]), f = s(f, m, g, h, v, 6, b[56]), h = s(h, f, m, g, x, 10, b[57]), g = s(g, h, f, m, t, 15, b[58]), m = s(m, g, h, f, D, 21, b[59]), f = s(f, m, g, h, z, 6, b[60]), h = s(h, f, m, g, C, 10, b[61]), g = s(g, h, f, m, j, 15, b[62]), m = s(m, g, h, f, A, 21, b[63]); a[0] = a[0] + f | 0; a[1] = a[1] + m | 0; a[2] = a[2] + g | 0; a[3] = a[3] + h | 0
        }, _doFinalize: function () {
          var b = this._data, n = b.words, a = 8 * this._nDataBytes, c = 8 * b.sigBytes; n[c >>> 5] |= 128 << 24 - c % 32; var e = u.floor(a /
            4294967296); n[(c + 64 >>> 9 << 4) + 15] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360; n[(c + 64 >>> 9 << 4) + 14] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360; b.sigBytes = 4 * (n.length + 1); this._process(); b = this._hash; n = b.words; for (a = 0; 4 > a; a++)c = n[a], n[a] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360; return b
        }, clone: function () { var b = v.clone.call(this); b._hash = this._hash.clone(); return b }
      }); t.MD5 = v._createHelper(r); t.HmacMD5 = v._createHmacHelper(r)
    })(Math);
    (function () {
      var u = CryptoJS, p = u.lib, d = p.Base, l = p.WordArray, p = u.algo, s = p.EvpKDF = d.extend({ cfg: d.extend({ keySize: 4, hasher: p.MD5, iterations: 1 }), init: function (d) { this.cfg = this.cfg.extend(d) }, compute: function (d, r) { for (var p = this.cfg, s = p.hasher.create(), b = l.create(), u = b.words, q = p.keySize, p = p.iterations; u.length < q;) { n && s.update(n); var n = s.update(d).finalize(r); s.reset(); for (var a = 1; a < p; a++)n = s.finalize(n), s.reset(); b.concat(n) } b.sigBytes = 4 * q; return b } }); u.EvpKDF = function (d, l, p) {
        return s.create(p).compute(d,
          l)
      }
    })();
    CryptoJS.lib.Cipher || function (u) {
      var p = CryptoJS, d = p.lib, l = d.Base, s = d.WordArray, t = d.BufferedBlockAlgorithm, r = p.enc.Base64, w = p.algo.EvpKDF, v = d.Cipher = t.extend({
        cfg: l.extend(), createEncryptor: function (e, a) { return this.create(this._ENC_XFORM_MODE, e, a) }, createDecryptor: function (e, a) { return this.create(this._DEC_XFORM_MODE, e, a) }, init: function (e, a, b) { this.cfg = this.cfg.extend(b); this._xformMode = e; this._key = a; this.reset() }, reset: function () { t.reset.call(this); this._doReset() }, process: function (e) { this._append(e); return this._process() },
        finalize: function (e) { e && this._append(e); return this._doFinalize() }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function (e) { return { encrypt: function (b, k, d) { return ("string" == typeof k ? c : a).encrypt(e, b, k, d) }, decrypt: function (b, k, d) { return ("string" == typeof k ? c : a).decrypt(e, b, k, d) } } }
      }); d.StreamCipher = v.extend({ _doFinalize: function () { return this._process(!0) }, blockSize: 1 }); var b = p.mode = {}, x = function (e, a, b) {
        var c = this._iv; c ? this._iv = u : c = this._prevBlock; for (var d = 0; d < b; d++)e[a + d] ^=
          c[d]
      }, q = (d.BlockCipherMode = l.extend({ createEncryptor: function (e, a) { return this.Encryptor.create(e, a) }, createDecryptor: function (e, a) { return this.Decryptor.create(e, a) }, init: function (e, a) { this._cipher = e; this._iv = a } })).extend(); q.Encryptor = q.extend({ processBlock: function (e, a) { var b = this._cipher, c = b.blockSize; x.call(this, e, a, c); b.encryptBlock(e, a); this._prevBlock = e.slice(a, a + c) } }); q.Decryptor = q.extend({
        processBlock: function (e, a) {
          var b = this._cipher, c = b.blockSize, d = e.slice(a, a + c); b.decryptBlock(e, a); x.call(this,
            e, a, c); this._prevBlock = d
        }
      }); b = b.CBC = q; q = (p.pad = {}).Pkcs7 = { pad: function (a, b) { for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, l = [], n = 0; n < c; n += 4)l.push(d); c = s.create(l, c); a.concat(c) }, unpad: function (a) { a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255 } }; d.BlockCipher = v.extend({
        cfg: v.cfg.extend({ mode: b, padding: q }), reset: function () {
          v.reset.call(this); var a = this.cfg, b = a.iv, a = a.mode; if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor; else c = a.createDecryptor, this._minBufferSize = 1; this._mode = c.call(a,
            this, b && b.words)
        }, _doProcessBlock: function (a, b) { this._mode.processBlock(a, b) }, _doFinalize: function () { var a = this.cfg.padding; if (this._xformMode == this._ENC_XFORM_MODE) { a.pad(this._data, this.blockSize); var b = this._process(!0) } else b = this._process(!0), a.unpad(b); return b }, blockSize: 4
      }); var n = d.CipherParams = l.extend({ init: function (a) { this.mixIn(a) }, toString: function (a) { return (a || this.formatter).stringify(this) } }), b = (p.format = {}).OpenSSL = {
        stringify: function (a) {
          var b = a.ciphertext; a = a.salt; return (a ? s.create([1398893684,
            1701076831]).concat(a).concat(b) : b).toString(r)
        }, parse: function (a) { a = r.parse(a); var b = a.words; if (1398893684 == b[0] && 1701076831 == b[1]) { var c = s.create(b.slice(2, 4)); b.splice(0, 4); a.sigBytes -= 16 } return n.create({ ciphertext: a, salt: c }) }
      }, a = d.SerializableCipher = l.extend({
        cfg: l.extend({ format: b }), encrypt: function (a, b, c, d) { d = this.cfg.extend(d); var l = a.createEncryptor(c, d); b = l.finalize(b); l = l.cfg; return n.create({ ciphertext: b, key: c, iv: l.iv, algorithm: a, mode: l.mode, padding: l.padding, blockSize: a.blockSize, formatter: d.format }) },
        decrypt: function (a, b, c, d) { d = this.cfg.extend(d); b = this._parse(b, d.format); return a.createDecryptor(c, d).finalize(b.ciphertext) }, _parse: function (a, b) { return "string" == typeof a ? b.parse(a, this) : a }
      }), p = (p.kdf = {}).OpenSSL = { execute: function (a, b, c, d) { d || (d = s.random(8)); a = w.create({ keySize: b + c }).compute(a, d); c = s.create(a.words.slice(b), 4 * c); a.sigBytes = 4 * b; return n.create({ key: a, iv: c, salt: d }) } }, c = d.PasswordBasedCipher = a.extend({
        cfg: a.cfg.extend({ kdf: p }), encrypt: function (b, c, d, l) {
          l = this.cfg.extend(l); d = l.kdf.execute(d,
            b.keySize, b.ivSize); l.iv = d.iv; b = a.encrypt.call(this, b, c, d.key, l); b.mixIn(d); return b
        }, decrypt: function (b, c, d, l) { l = this.cfg.extend(l); c = this._parse(c, l.format); d = l.kdf.execute(d, b.keySize, b.ivSize, c.salt); l.iv = d.iv; return a.decrypt.call(this, b, c, d.key, l) }
      })
    }();
    (function () {
      for (var u = CryptoJS, p = u.lib.BlockCipher, d = u.algo, l = [], s = [], t = [], r = [], w = [], v = [], b = [], x = [], q = [], n = [], a = [], c = 0; 256 > c; c++)a[c] = 128 > c ? c << 1 : c << 1 ^ 283; for (var e = 0, j = 0, c = 0; 256 > c; c++) { var k = j ^ j << 1 ^ j << 2 ^ j << 3 ^ j << 4, k = k >>> 8 ^ k & 255 ^ 99; l[e] = k; s[k] = e; var z = a[e], F = a[z], G = a[F], y = 257 * a[k] ^ 16843008 * k; t[e] = y << 24 | y >>> 8; r[e] = y << 16 | y >>> 16; w[e] = y << 8 | y >>> 24; v[e] = y; y = 16843009 * G ^ 65537 * F ^ 257 * z ^ 16843008 * e; b[k] = y << 24 | y >>> 8; x[k] = y << 16 | y >>> 16; q[k] = y << 8 | y >>> 24; n[k] = y; e ? (e = z ^ a[a[a[G ^ z]]], j ^= a[a[j]]) : e = j = 1 } var H = [0, 1, 2, 4, 8,
        16, 32, 64, 128, 27, 54], d = d.AES = p.extend({
          _doReset: function () {
            for (var a = this._key, c = a.words, d = a.sigBytes / 4, a = 4 * ((this._nRounds = d + 6) + 1), e = this._keySchedule = [], j = 0; j < a; j++)if (j < d) e[j] = c[j]; else { var k = e[j - 1]; j % d ? 6 < d && 4 == j % d && (k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255]) : (k = k << 8 | k >>> 24, k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255], k ^= H[j / d | 0] << 24); e[j] = e[j - d] ^ k } c = this._invKeySchedule = []; for (d = 0; d < a; d++)j = a - d, k = d % 4 ? e[j] : e[j - 4], c[d] = 4 > d || 4 >= j ? k : b[l[k >>> 24]] ^ x[l[k >>> 16 & 255]] ^ q[l[k >>>
              8 & 255]] ^ n[l[k & 255]]
          }, encryptBlock: function (a, b) { this._doCryptBlock(a, b, this._keySchedule, t, r, w, v, l) }, decryptBlock: function (a, c) { var d = a[c + 1]; a[c + 1] = a[c + 3]; a[c + 3] = d; this._doCryptBlock(a, c, this._invKeySchedule, b, x, q, n, s); d = a[c + 1]; a[c + 1] = a[c + 3]; a[c + 3] = d }, _doCryptBlock: function (a, b, c, d, e, j, l, f) {
            for (var m = this._nRounds, g = a[b] ^ c[0], h = a[b + 1] ^ c[1], k = a[b + 2] ^ c[2], n = a[b + 3] ^ c[3], p = 4, r = 1; r < m; r++)var q = d[g >>> 24] ^ e[h >>> 16 & 255] ^ j[k >>> 8 & 255] ^ l[n & 255] ^ c[p++], s = d[h >>> 24] ^ e[k >>> 16 & 255] ^ j[n >>> 8 & 255] ^ l[g & 255] ^ c[p++], t =
              d[k >>> 24] ^ e[n >>> 16 & 255] ^ j[g >>> 8 & 255] ^ l[h & 255] ^ c[p++], n = d[n >>> 24] ^ e[g >>> 16 & 255] ^ j[h >>> 8 & 255] ^ l[k & 255] ^ c[p++], g = q, h = s, k = t; q = (f[g >>> 24] << 24 | f[h >>> 16 & 255] << 16 | f[k >>> 8 & 255] << 8 | f[n & 255]) ^ c[p++]; s = (f[h >>> 24] << 24 | f[k >>> 16 & 255] << 16 | f[n >>> 8 & 255] << 8 | f[g & 255]) ^ c[p++]; t = (f[k >>> 24] << 24 | f[n >>> 16 & 255] << 16 | f[g >>> 8 & 255] << 8 | f[h & 255]) ^ c[p++]; n = (f[n >>> 24] << 24 | f[g >>> 16 & 255] << 16 | f[h >>> 8 & 255] << 8 | f[k & 255]) ^ c[p++]; a[b] = q; a[b + 1] = s; a[b + 2] = t; a[b + 3] = n
          }, keySize: 8
        }); u.AES = p._createHelper(d)
    })();
    // Jake end
  
    /**
     * @fileoverview
     * - Using the 'QRCode for Javascript library'
     * - Fixed dataset of 'QRCode for Javascript library' for support full-spec.
     * - this library has no dependencies.
     * 
     * @author davidshimjs
     * @see <a href="http://www.d-project.com/" target="_blank">http://www.d-project.com/</a>
     * @see <a href="http://jeromeetienne.github.com/jquery-qrcode/" target="_blank">http://jeromeetienne.github.com/jquery-qrcode/</a>
     */
    var QRCode;
  
    (function () {
      //---------------------------------------------------------------------
      // QRCode for JavaScript
      //
      // Copyright (c) 2009 Kazuhiko Arase
      //
      // URL: http://www.d-project.com/
      //
      // Licensed under the MIT license:
      //   http://www.opensource.org/licenses/mit-license.php
      //
      // The word "QR Code" is registered trademark of 
      // DENSO WAVE INCORPORATED
      //   http://www.denso-wave.com/qrcode/faqpatent-e.html
      //
      //---------------------------------------------------------------------
      function QR8bitByte(data) {
        this.mode = QRMode.MODE_8BIT_BYTE;
        this.data = data;
        this.parsedData = [];
  
        // Added to support UTF-8 Characters
        for (var i = 0, l = this.data.length; i < l; i++) {
          var byteArray = [];
          var code = this.data.charCodeAt(i);
  
          if (code > 0x10000) {
            byteArray[0] = 0xF0 | ((code & 0x1C0000) >>> 18);
            byteArray[1] = 0x80 | ((code & 0x3F000) >>> 12);
            byteArray[2] = 0x80 | ((code & 0xFC0) >>> 6);
            byteArray[3] = 0x80 | (code & 0x3F);
          } else if (code > 0x800) {
            byteArray[0] = 0xE0 | ((code & 0xF000) >>> 12);
            byteArray[1] = 0x80 | ((code & 0xFC0) >>> 6);
            byteArray[2] = 0x80 | (code & 0x3F);
          } else if (code > 0x80) {
            byteArray[0] = 0xC0 | ((code & 0x7C0) >>> 6);
            byteArray[1] = 0x80 | (code & 0x3F);
          } else {
            byteArray[0] = code;
          }
  
          this.parsedData.push(byteArray);
        }
  
        this.parsedData = Array.prototype.concat.apply([], this.parsedData);
  
        if (this.parsedData.length != this.data.length) {
          this.parsedData.unshift(191);
          this.parsedData.unshift(187);
          this.parsedData.unshift(239);
        }
      }
  
      QR8bitByte.prototype = {
        getLength: function (buffer) {
          return this.parsedData.length;
        },
        write: function (buffer) {
          for (var i = 0, l = this.parsedData.length; i < l; i++) {
            buffer.put(this.parsedData[i], 8);
          }
        }
      };
  
      function QRCodeModel(typeNumber, errorCorrectLevel) {
        this.typeNumber = typeNumber;
        this.errorCorrectLevel = errorCorrectLevel;
        this.modules = null;
        this.moduleCount = 0;
        this.dataCache = null;
        this.dataList = [];
      }
  
      QRCodeModel.prototype = {
        addData: function (data) { var newData = new QR8bitByte(data); this.dataList.push(newData); this.dataCache = null; }, isDark: function (row, col) {
          if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) { throw new Error(row + "," + col); }
          return this.modules[row][col];
        }, getModuleCount: function () { return this.moduleCount; }, make: function () { this.makeImpl(false, this.getBestMaskPattern()); }, makeImpl: function (test, maskPattern) {
          this.moduleCount = this.typeNumber * 4 + 17; this.modules = new Array(this.moduleCount); for (var row = 0; row < this.moduleCount; row++) { this.modules[row] = new Array(this.moduleCount); for (var col = 0; col < this.moduleCount; col++) { this.modules[row][col] = null; } }
          this.setupPositionProbePattern(0, 0); this.setupPositionProbePattern(this.moduleCount - 7, 0); this.setupPositionProbePattern(0, this.moduleCount - 7); this.setupPositionAdjustPattern(); this.setupTimingPattern(); this.setupTypeInfo(test, maskPattern); if (this.typeNumber >= 7) { this.setupTypeNumber(test); }
          if (this.dataCache == null) { this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList); }
          this.mapData(this.dataCache, maskPattern);
        }, setupPositionProbePattern: function (row, col) { for (var r = -1; r <= 7; r++) { if (row + r <= -1 || this.moduleCount <= row + r) continue; for (var c = -1; c <= 7; c++) { if (col + c <= -1 || this.moduleCount <= col + c) continue; if ((0 <= r && r <= 6 && (c == 0 || c == 6)) || (0 <= c && c <= 6 && (r == 0 || r == 6)) || (2 <= r && r <= 4 && 2 <= c && c <= 4)) { this.modules[row + r][col + c] = true; } else { this.modules[row + r][col + c] = false; } } } }, getBestMaskPattern: function () {
          var minLostPoint = 0; var pattern = 0; for (var i = 0; i < 8; i++) { this.makeImpl(true, i); var lostPoint = QRUtil.getLostPoint(this); if (i == 0 || minLostPoint > lostPoint) { minLostPoint = lostPoint; pattern = i; } }
          return pattern;
        }, createMovieClip: function (target_mc, instance_name, depth) {
          var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth); var cs = 1; this.make(); for (var row = 0; row < this.modules.length; row++) { var y = row * cs; for (var col = 0; col < this.modules[row].length; col++) { var x = col * cs; var dark = this.modules[row][col]; if (dark) { qr_mc.beginFill(0, 100); qr_mc.moveTo(x, y); qr_mc.lineTo(x + cs, y); qr_mc.lineTo(x + cs, y + cs); qr_mc.lineTo(x, y + cs); qr_mc.endFill(); } } }
          return qr_mc;
        }, setupTimingPattern: function () {
          for (var r = 8; r < this.moduleCount - 8; r++) {
            if (this.modules[r][6] != null) { continue; }
            this.modules[r][6] = (r % 2 == 0);
          }
          for (var c = 8; c < this.moduleCount - 8; c++) {
            if (this.modules[6][c] != null) { continue; }
            this.modules[6][c] = (c % 2 == 0);
          }
        }, setupPositionAdjustPattern: function () {
          var pos = QRUtil.getPatternPosition(this.typeNumber); for (var i = 0; i < pos.length; i++) {
            for (var j = 0; j < pos.length; j++) {
              var row = pos[i]; var col = pos[j]; if (this.modules[row][col] != null) { continue; }
              for (var r = -2; r <= 2; r++) { for (var c = -2; c <= 2; c++) { if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) { this.modules[row + r][col + c] = true; } else { this.modules[row + r][col + c] = false; } } }
            }
          }
        }, setupTypeNumber: function (test) {
          var bits = QRUtil.getBCHTypeNumber(this.typeNumber); for (var i = 0; i < 18; i++) { var mod = (!test && ((bits >> i) & 1) == 1); this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod; }
          for (var i = 0; i < 18; i++) { var mod = (!test && ((bits >> i) & 1) == 1); this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod; }
        }, setupTypeInfo: function (test, maskPattern) {
          var data = (this.errorCorrectLevel << 3) | maskPattern; var bits = QRUtil.getBCHTypeInfo(data); for (var i = 0; i < 15; i++) { var mod = (!test && ((bits >> i) & 1) == 1); if (i < 6) { this.modules[i][8] = mod; } else if (i < 8) { this.modules[i + 1][8] = mod; } else { this.modules[this.moduleCount - 15 + i][8] = mod; } }
          for (var i = 0; i < 15; i++) { var mod = (!test && ((bits >> i) & 1) == 1); if (i < 8) { this.modules[8][this.moduleCount - i - 1] = mod; } else if (i < 9) { this.modules[8][15 - i - 1 + 1] = mod; } else { this.modules[8][15 - i - 1] = mod; } }
          this.modules[this.moduleCount - 8][8] = (!test);
        }, mapData: function (data, maskPattern) {
          var inc = -1; var row = this.moduleCount - 1; var bitIndex = 7; var byteIndex = 0; for (var col = this.moduleCount - 1; col > 0; col -= 2) {
            if (col == 6) col--; while (true) {
              for (var c = 0; c < 2; c++) {
                if (this.modules[row][col - c] == null) {
                  var dark = false; if (byteIndex < data.length) { dark = (((data[byteIndex] >>> bitIndex) & 1) == 1); }
                  var mask = QRUtil.getMask(maskPattern, row, col - c); if (mask) { dark = !dark; }
                  this.modules[row][col - c] = dark; bitIndex--; if (bitIndex == -1) { byteIndex++; bitIndex = 7; }
                }
              }
              row += inc; if (row < 0 || this.moduleCount <= row) { row -= inc; inc = -inc; break; }
            }
          }
        }
      }; QRCodeModel.PAD0 = 0xEC; QRCodeModel.PAD1 = 0x11; QRCodeModel.createData = function (typeNumber, errorCorrectLevel, dataList) {
        var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel); var buffer = new QRBitBuffer(); for (var i = 0; i < dataList.length; i++) { var data = dataList[i]; buffer.put(data.mode, 4); buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber)); data.write(buffer); }
        var totalDataCount = 0; for (var i = 0; i < rsBlocks.length; i++) { totalDataCount += rsBlocks[i].dataCount; }
        if (buffer.getLengthInBits() > totalDataCount * 8) {
          throw new Error("code length overflow. ("
            + buffer.getLengthInBits()
            + ">"
            + totalDataCount * 8
            + ")");
        }
        if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) { buffer.put(0, 4); }
        while (buffer.getLengthInBits() % 8 != 0) { buffer.putBit(false); }
        while (true) {
          if (buffer.getLengthInBits() >= totalDataCount * 8) { break; }
          buffer.put(QRCodeModel.PAD0, 8); if (buffer.getLengthInBits() >= totalDataCount * 8) { break; }
          buffer.put(QRCodeModel.PAD1, 8);
        }
        return QRCodeModel.createBytes(buffer, rsBlocks);
      }; QRCodeModel.createBytes = function (buffer, rsBlocks) {
        var offset = 0; var maxDcCount = 0; var maxEcCount = 0; var dcdata = new Array(rsBlocks.length); var ecdata = new Array(rsBlocks.length); for (var r = 0; r < rsBlocks.length; r++) {
          var dcCount = rsBlocks[r].dataCount; var ecCount = rsBlocks[r].totalCount - dcCount; maxDcCount = Math.max(maxDcCount, dcCount); maxEcCount = Math.max(maxEcCount, ecCount); dcdata[r] = new Array(dcCount); for (var i = 0; i < dcdata[r].length; i++) { dcdata[r][i] = 0xff & buffer.buffer[i + offset]; }
          offset += dcCount; var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount); var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1); var modPoly = rawPoly.mod(rsPoly); ecdata[r] = new Array(rsPoly.getLength() - 1); for (var i = 0; i < ecdata[r].length; i++) { var modIndex = i + modPoly.getLength() - ecdata[r].length; ecdata[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0; }
        }
        var totalCodeCount = 0; for (var i = 0; i < rsBlocks.length; i++) { totalCodeCount += rsBlocks[i].totalCount; }
        var data = new Array(totalCodeCount); var index = 0; for (var i = 0; i < maxDcCount; i++) { for (var r = 0; r < rsBlocks.length; r++) { if (i < dcdata[r].length) { data[index++] = dcdata[r][i]; } } }
        for (var i = 0; i < maxEcCount; i++) { for (var r = 0; r < rsBlocks.length; r++) { if (i < ecdata[r].length) { data[index++] = ecdata[r][i]; } } }
        return data;
      }; var QRMode = { MODE_NUMBER: 1 << 0, MODE_ALPHA_NUM: 1 << 1, MODE_8BIT_BYTE: 1 << 2, MODE_KANJI: 1 << 3 }; var QRErrorCorrectLevel = { L: 1, M: 0, Q: 3, H: 2 }; var QRMaskPattern = { PATTERN000: 0, PATTERN001: 1, PATTERN010: 2, PATTERN011: 3, PATTERN100: 4, PATTERN101: 5, PATTERN110: 6, PATTERN111: 7 }; var QRUtil = {
        PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], G15: (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0), G18: (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0), G15_MASK: (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1), getBCHTypeInfo: function (data) {
          var d = data << 10; while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) { d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15))); }
          return ((data << 10) | d) ^ QRUtil.G15_MASK;
        }, getBCHTypeNumber: function (data) {
          var d = data << 12; while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) { d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18))); }
          return (data << 12) | d;
        }, getBCHDigit: function (data) {
          var digit = 0; while (data != 0) { digit++; data >>>= 1; }
          return digit;
        }, getPatternPosition: function (typeNumber) { return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1]; }, getMask: function (maskPattern, i, j) { switch (maskPattern) { case QRMaskPattern.PATTERN000: return (i + j) % 2 == 0; case QRMaskPattern.PATTERN001: return i % 2 == 0; case QRMaskPattern.PATTERN010: return j % 3 == 0; case QRMaskPattern.PATTERN011: return (i + j) % 3 == 0; case QRMaskPattern.PATTERN100: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0; case QRMaskPattern.PATTERN101: return (i * j) % 2 + (i * j) % 3 == 0; case QRMaskPattern.PATTERN110: return ((i * j) % 2 + (i * j) % 3) % 2 == 0; case QRMaskPattern.PATTERN111: return ((i * j) % 3 + (i + j) % 2) % 2 == 0; default: throw new Error("bad maskPattern:" + maskPattern); } }, getErrorCorrectPolynomial: function (errorCorrectLength) {
          var a = new QRPolynomial([1], 0); for (var i = 0; i < errorCorrectLength; i++) { a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0)); }
          return a;
        }, getLengthInBits: function (mode, type) { if (1 <= type && type < 10) { switch (mode) { case QRMode.MODE_NUMBER: return 10; case QRMode.MODE_ALPHA_NUM: return 9; case QRMode.MODE_8BIT_BYTE: return 8; case QRMode.MODE_KANJI: return 8; default: throw new Error("mode:" + mode); } } else if (type < 27) { switch (mode) { case QRMode.MODE_NUMBER: return 12; case QRMode.MODE_ALPHA_NUM: return 11; case QRMode.MODE_8BIT_BYTE: return 16; case QRMode.MODE_KANJI: return 10; default: throw new Error("mode:" + mode); } } else if (type < 41) { switch (mode) { case QRMode.MODE_NUMBER: return 14; case QRMode.MODE_ALPHA_NUM: return 13; case QRMode.MODE_8BIT_BYTE: return 16; case QRMode.MODE_KANJI: return 12; default: throw new Error("mode:" + mode); } } else { throw new Error("type:" + type); } }, getLostPoint: function (qrCode) {
          var moduleCount = qrCode.getModuleCount(); var lostPoint = 0; for (var row = 0; row < moduleCount; row++) {
            for (var col = 0; col < moduleCount; col++) {
              var sameCount = 0; var dark = qrCode.isDark(row, col); for (var r = -1; r <= 1; r++) {
                if (row + r < 0 || moduleCount <= row + r) { continue; }
                for (var c = -1; c <= 1; c++) {
                  if (col + c < 0 || moduleCount <= col + c) { continue; }
                  if (r == 0 && c == 0) { continue; }
                  if (dark == qrCode.isDark(row + r, col + c)) { sameCount++; }
                }
              }
              if (sameCount > 5) { lostPoint += (3 + sameCount - 5); }
            }
          }
          for (var row = 0; row < moduleCount - 1; row++) { for (var col = 0; col < moduleCount - 1; col++) { var count = 0; if (qrCode.isDark(row, col)) count++; if (qrCode.isDark(row + 1, col)) count++; if (qrCode.isDark(row, col + 1)) count++; if (qrCode.isDark(row + 1, col + 1)) count++; if (count == 0 || count == 4) { lostPoint += 3; } } }
          for (var row = 0; row < moduleCount; row++) { for (var col = 0; col < moduleCount - 6; col++) { if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) { lostPoint += 40; } } }
          for (var col = 0; col < moduleCount; col++) { for (var row = 0; row < moduleCount - 6; row++) { if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) { lostPoint += 40; } } }
          var darkCount = 0; for (var col = 0; col < moduleCount; col++) { for (var row = 0; row < moduleCount; row++) { if (qrCode.isDark(row, col)) { darkCount++; } } }
          var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5; lostPoint += ratio * 10; return lostPoint;
        }
      }; var QRMath = {
        glog: function (n) {
          if (n < 1) { throw new Error("glog(" + n + ")"); }
          return QRMath.LOG_TABLE[n];
        }, gexp: function (n) {
          while (n < 0) { n += 255; }
          while (n >= 256) { n -= 255; }
          return QRMath.EXP_TABLE[n];
        }, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256)
      }; for (var i = 0; i < 8; i++) { QRMath.EXP_TABLE[i] = 1 << i; }
      for (var i = 8; i < 256; i++) { QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8]; }
      for (var i = 0; i < 255; i++) { QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i; }
      function QRPolynomial(num, shift) {
        if (num.length == undefined) { throw new Error(num.length + "/" + shift); }
        var offset = 0; while (offset < num.length && num[offset] == 0) { offset++; }
        this.num = new Array(num.length - offset + shift); for (var i = 0; i < num.length - offset; i++) { this.num[i] = num[i + offset]; }
      }
      QRPolynomial.prototype = {
        get: function (index) { return this.num[index]; }, getLength: function () { return this.num.length; }, multiply: function (e) {
          var num = new Array(this.getLength() + e.getLength() - 1); for (var i = 0; i < this.getLength(); i++) { for (var j = 0; j < e.getLength(); j++) { num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j))); } }
          return new QRPolynomial(num, 0);
        }, mod: function (e) {
          if (this.getLength() - e.getLength() < 0) { return this; }
          var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0)); var num = new Array(this.getLength()); for (var i = 0; i < this.getLength(); i++) { num[i] = this.get(i); }
          for (var i = 0; i < e.getLength(); i++) { num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio); }
          return new QRPolynomial(num, 0).mod(e);
        }
      }; function QRRSBlock(totalCount, dataCount) { this.totalCount = totalCount; this.dataCount = dataCount; }
      QRRSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]]; QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
        var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel); if (rsBlock == undefined) { throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel); }
        var length = rsBlock.length / 3; var list = []; for (var i = 0; i < length; i++) { var count = rsBlock[i * 3 + 0]; var totalCount = rsBlock[i * 3 + 1]; var dataCount = rsBlock[i * 3 + 2]; for (var j = 0; j < count; j++) { list.push(new QRRSBlock(totalCount, dataCount)); } }
        return list;
      }; QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) { switch (errorCorrectLevel) { case QRErrorCorrectLevel.L: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0]; case QRErrorCorrectLevel.M: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1]; case QRErrorCorrectLevel.Q: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2]; case QRErrorCorrectLevel.H: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3]; default: return undefined; } }; function QRBitBuffer() { this.buffer = []; this.length = 0; }
      QRBitBuffer.prototype = {
        get: function (index) { var bufIndex = Math.floor(index / 8); return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) == 1; }, put: function (num, length) { for (var i = 0; i < length; i++) { this.putBit(((num >>> (length - i - 1)) & 1) == 1); } }, getLengthInBits: function () { return this.length; }, putBit: function (bit) {
          var bufIndex = Math.floor(this.length / 8); if (this.buffer.length <= bufIndex) { this.buffer.push(0); }
          if (bit) { this.buffer[bufIndex] |= (0x80 >>> (this.length % 8)); }
          this.length++;
        }
      }; var QRCodeLimitLength = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];
  
      function _isSupportCanvas() {
        return typeof CanvasRenderingContext2D != "undefined";
      }
  
      // android 2.x doesn't support Data-URI spec
      function _getAndroid() {
        var android = false;
        var sAgent = navigator.userAgent;
  
        if (/android/i.test(sAgent)) { // android
          android = true;
          var aMat = sAgent.toString().match(/android ([0-9]\.[0-9])/i);
  
          if (aMat && aMat[1]) {
            android = parseFloat(aMat[1]);
          }
        }
  
        return android;
      }
  
      var svgDrawer = (function () {
  
        var Drawing = function (el, htOption) {
          this._el = el;
          this._htOption = htOption;
        };
  
        Drawing.prototype.draw = function (oQRCode) {
          var _htOption = this._htOption;
          var _el = this._el;
          var nCount = oQRCode.getModuleCount();
          var nWidth = Math.floor(_htOption.width / nCount);
          var nHeight = Math.floor(_htOption.height / nCount);
  
          this.clear();
  
          function makeSVG(tag, attrs) {
            var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
            for (var k in attrs)
              if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
            return el;
          }
  
          var svg = makeSVG("svg", { 'viewBox': '0 0 ' + String(nCount) + " " + String(nCount), 'width': '100%', 'height': '100%', 'fill': _htOption.colorLight });
          svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
          _el.appendChild(svg);
  
          svg.appendChild(makeSVG("rect", { "fill": _htOption.colorLight, "width": "100%", "height": "100%" }));
          svg.appendChild(makeSVG("rect", { "fill": _htOption.colorDark, "width": "1", "height": "1", "id": "template" }));
  
          for (var row = 0; row < nCount; row++) {
            for (var col = 0; col < nCount; col++) {
              if (oQRCode.isDark(row, col)) {
                var child = makeSVG("use", { "x": String(col), "y": String(row) });
                child.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template")
                svg.appendChild(child);
              }
            }
          }
        };
        Drawing.prototype.clear = function () {
          while (this._el.hasChildNodes())
            this._el.removeChild(this._el.lastChild);
        };
        return Drawing;
      })();
  
      var useSVG = document.documentElement.tagName.toLowerCase() === "svg";
  
      // Drawing in DOM by using Table tag
      var Drawing = useSVG ? svgDrawer : !_isSupportCanvas() ? (function () {
        var Drawing = function (el, htOption) {
          this._el = el;
          this._htOption = htOption;
        };
  
        /**
         * Draw the QRCode
         * 
         * @param {QRCode} oQRCode
         */
        Drawing.prototype.draw = function (oQRCode) {
          var _htOption = this._htOption;
          var _el = this._el;
          var nCount = oQRCode.getModuleCount();
          var nWidth = Math.floor(_htOption.width / nCount);
          var nHeight = Math.floor(_htOption.height / nCount);
          var aHTML = ['<table style="border:0;border-collapse:collapse;">'];
  
          for (var row = 0; row < nCount; row++) {
            aHTML.push('<tr>');
  
            for (var col = 0; col < nCount; col++) {
              aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (oQRCode.isDark(row, col) ? _htOption.colorDark : _htOption.colorLight) + ';"></td>');
            }
  
            aHTML.push('</tr>');
          }
  
          aHTML.push('</table>');
          _el.innerHTML = aHTML.join('');
  
          // Fix the margin values as real size.
          var elTable = _el.childNodes[0];
          var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
          var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;
  
          if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
            elTable.style.margin = nTopMarginTable + "px " + nLeftMarginTable + "px";
          }
        };
  
        /**
         * Clear the QRCode
         */
        Drawing.prototype.clear = function () {
          this._el.innerHTML = '';
        };
  
        return Drawing;
      })() : (function () { // Drawing in Canvas
        function _onMakeImage() {
          this._elImage.src = this._elCanvas.toDataURL("image/png");
          this._elImage.style.display = "block";
          this._elCanvas.style.display = "none";
        }
  
        // Android 2.1 bug workaround
        // http://code.google.com/p/android/issues/detail?id=5141
  
        /**
         * Check whether the user's browser supports Data URI or not
         * 
         * @private
         * @param {Function} fSuccess Occurs if it supports Data URI
         * @param {Function} fFail Occurs if it doesn't support Data URI
         */
        function _safeSetDataURI(fSuccess, fFail) {
          var self = this;
          self._fFail = fFail;
          self._fSuccess = fSuccess;
  
          // Check it just once
          if (self._bSupportDataURI === null) {
            var el = document.createElement("img");
            var fOnError = function () {
              self._bSupportDataURI = false;
  
              if (self._fFail) {
                self._fFail.call(self);
              }
            };
            var fOnSuccess = function () {
              self._bSupportDataURI = true;
  
              if (self._fSuccess) {
                self._fSuccess.call(self);
              }
            };
  
            el.onabort = fOnError;
            el.onerror = fOnError;
            el.onload = fOnSuccess;
            el.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="; // the Image contains 1px data.
            return;
          } else if (self._bSupportDataURI === true && self._fSuccess) {
            self._fSuccess.call(self);
          } else if (self._bSupportDataURI === false && self._fFail) {
            self._fFail.call(self);
          }
        };
  
        /**
         * Drawing QRCode by using canvas
         * 
         * @constructor
         * @param {HTMLElement} el
         * @param {Object} htOption QRCode Options 
         */
        var Drawing = function (el, htOption) {
          this._bIsPainted = false;
  
          this._htOption = htOption;
          this._elCanvas = document.createElement("canvas");
          this._elCanvas.width = htOption.width;
          this._elCanvas.height = htOption.height;
          el.appendChild(this._elCanvas);
          this._el = el;
          this._oContext = this._elCanvas.getContext("2d");
          this._bIsPainted = false;
          this._elImage = document.createElement("img");
          this._elImage.alt = "Scan me!";
          this._elImage.style.display = "none";
          this._el.appendChild(this._elImage);
          this._bSupportDataURI = null;
        };
  
        /**
         * Draw the QRCode
         * 
         * @param {QRCode} oQRCode 
         */
        Drawing.prototype.draw = function (oQRCode) {
          var _elImage = this._elImage;
          var _oContext = this._oContext;
          var _htOption = this._htOption;
  
          var nCount = oQRCode.getModuleCount();
          var nWidth = _htOption.width / nCount;
          var nHeight = _htOption.height / nCount;
          var nRoundedWidth = Math.round(nWidth);
          var nRoundedHeight = Math.round(nHeight);
  
          _elImage.style.display = "none";
          this.clear();
  
          for (var row = 0; row < nCount; row++) {
            for (var col = 0; col < nCount; col++) {
              var bIsDark = oQRCode.isDark(row, col);
              var nLeft = col * nWidth;
              var nTop = row * nHeight;
              _oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
              _oContext.lineWidth = 1;
              _oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
              _oContext.fillRect(nLeft, nTop, nWidth, nHeight);
  
              // 안티 앨리어싱 방지 처리
              _oContext.strokeRect(
                Math.floor(nLeft) + 0.5,
                Math.floor(nTop) + 0.5,
                nRoundedWidth,
                nRoundedHeight
              );
  
              _oContext.strokeRect(
                Math.ceil(nLeft) - 0.5,
                Math.ceil(nTop) - 0.5,
                nRoundedWidth,
                nRoundedHeight
              );
            }
          }
  
          this._bIsPainted = true;
        };
  
        /**
         * Make the image from Canvas if the browser supports Data URI.
         */
        Drawing.prototype.makeImage = function () {
          if (this._bIsPainted) {
            _safeSetDataURI.call(this, _onMakeImage);
          }
        };
  
        /**
         * Return whether the QRCode is painted or not
         * 
         * @return {Boolean}
         */
        Drawing.prototype.isPainted = function () {
          return this._bIsPainted;
        };
  
        /**
         * Clear the QRCode
         */
        Drawing.prototype.clear = function () {
          this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
          this._bIsPainted = false;
        };
  
        /**
         * @private
         * @param {Number} nNumber
         */
        Drawing.prototype.round = function (nNumber) {
          if (!nNumber) {
            return nNumber;
          }
  
          return Math.floor(nNumber * 1000) / 1000;
        };
  
        return Drawing;
      })();
  
      /**
       * Get the type by string length
       * 
       * @private
       * @param {String} sText
       * @param {Number} nCorrectLevel
       * @return {Number} type
       */
      function _getTypeNumber(sText, nCorrectLevel) {
        var nType = 1;
        var length = _getUTF8Length(sText);
  
        for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
          var nLimit = 0;
  
          switch (nCorrectLevel) {
            case QRErrorCorrectLevel.L:
              nLimit = QRCodeLimitLength[i][0];
              break;
            case QRErrorCorrectLevel.M:
              nLimit = QRCodeLimitLength[i][1];
              break;
            case QRErrorCorrectLevel.Q:
              nLimit = QRCodeLimitLength[i][2];
              break;
            case QRErrorCorrectLevel.H:
              nLimit = QRCodeLimitLength[i][3];
              break;
          }
  
          if (length <= nLimit) {
            break;
          } else {
            nType++;
          }
        }
  
        if (nType > QRCodeLimitLength.length) {
          throw new Error("Too long data");
        }
  
        return nType;
      }
  
      function _getUTF8Length(sText) {
        var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
        return replacedText.length + (replacedText.length != sText ? 3 : 0);
      }
  
      /**
       * @class QRCode
       * @constructor
       * @example 
       * new QRCode(document.getElementById("test"), "http://jindo.dev.naver.com/collie");
       *
       * @example
       * var oQRCode = new QRCode("test", {
       *    text : "http://naver.com",
       *    width : 128,
       *    height : 128
       * });
       * 
       * oQRCode.clear(); // Clear the QRCode.
       * oQRCode.makeCode("http://map.naver.com"); // Re-create the QRCode.
       *
       * @param {HTMLElement|String} el target element or 'id' attribute of element.
       * @param {Object|String} vOption
       * @param {String} vOption.text QRCode link data
       * @param {Number} [vOption.width=256]
       * @param {Number} [vOption.height=256]
       * @param {String} [vOption.colorDark="#000000"]
       * @param {String} [vOption.colorLight="#ffffff"]
       * @param {QRCode.CorrectLevel} [vOption.correctLevel=QRCode.CorrectLevel.H] [L|M|Q|H] 
       */
      QRCode = function (el, vOption) {
        this._htOption = {
          width: 256,
          height: 256,
          typeNumber: 4,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRErrorCorrectLevel.H
        };
  
        if (typeof vOption === 'string') {
          vOption = {
            text: vOption
          };
        }
  
        // Overwrites options
        if (vOption) {
          for (var i in vOption) {
            this._htOption[i] = vOption[i];
          }
        }
  
        if (typeof el == "string") {
          el = document.getElementById(el);
        }
  
        if (this._htOption.useSVG) {
          Drawing = svgDrawer;
        }
  
        this._el = el;
        this._oQRCode = null;
        this._oDrawing = new Drawing(this._el, this._htOption);
  
        if (this._htOption.text) {
          this.makeCode(this._htOption.text);
        }
      };
  
      /**
       * Make the QRCode
       * 
       * @param {String} sText link data
       */
      QRCode.prototype.makeCode = function (sText) {
        this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel);
        this._oQRCode.addData(sText);
        this._oQRCode.make();
        this._el.title = sText;
        this._oDrawing.draw(this._oQRCode);
        this.makeImage();
      };
  
      /**
       * Make the Image from Canvas element
       * - It occurs automatically
       * - Android below 3 doesn't support Data-URI spec.
       * 
       * @private
       */
      QRCode.prototype.makeImage = function () {
        if (typeof this._oDrawing.makeImage == "function") {
          this._oDrawing.makeImage();
        }
      };
  
      /**
       * Clear the QRCode
       */
      QRCode.prototype.clear = function () {
        this._oDrawing.clear();
      };
  
      /**
       * @name QRCode.CorrectLevel
       */
      QRCode.CorrectLevel = QRErrorCorrectLevel;
    })();
  
    return {
      setters: [],
      execute: function () {
        _export("Application", Application = /*#__PURE__*/function () {
          function Application() {
            _classCallCheck(this, Application);
        
      // Replace setting path here
            window.settingsPath = 'src/settings.82c45.json';
            this.showFPS = false;
          }
  
          _createClass(Application, [{
            key: "init",
            value: function init(engine) {
              cc = engine;
              cc.game.onPostBaseInitDelegate.add(this.onPostInitBase.bind(this));
              cc.game.onPostSubsystemInitDelegate.add(this.onPostSystemInit.bind(this));
            }
          }, {
            key: "onPostInitBase",
            value: function onPostInitBase() {// cc.settings.overrideSettings('assets', 'server', '');
              // do custom logic
            }
          }, {
            key: "onPostSystemInit",
            value: function onPostSystemInit() {// do custom logic
            }
          }, {
            key: "start",
            value: function start() {
              new Promise(function (resolve, reject) {
                resolve();
              })
                .then(function () {
                  return loadSettingsJson();
                })
                .then(function () {
                  return new Promise(function (resolve, reject) {
                    let settings = window._CCSettings;
                    if (typeof setupSplash === 'function') {
                      setupSplash(settings);
                    }
                    resolve({ settings });
                  })
                })
                .then(function ({ settings }) {
                  return cc.game.init({
                    debugMode: settings.engine.debug ? cc.DebugMode.INFO : cc.DebugMode.ERROR,
                    settingsPath: window.settingsPath,
                    overrideSettings: {
                      // assets: {
                      //      preloadBundles: [{ bundle: 'main', version: 'xxx' }],
                      // }
                      profiling: {
                        showFPS: settings.engine.debug
                      }
                    }
                  })
                })
                .then(function () {
                  let url = window.location.href;
                  let startIndexOfToken = url.indexOf("token") < 0 ? -1 : url.indexOf("token") + 6;
                  let endIndexOfToken = url.indexOf("&affId");
                  let token = startIndexOfToken < 0 ? "" : url.substring(startIndexOfToken, endIndexOfToken < 0 ? url.length - 1 : endIndexOfToken);
                  if (token != "") {
                    var decrypted = CryptoJS.AES.decrypt(token, "$2y$10$h1ReYJStnFLyO3MvV7");
                    localStorage.setItem("data_from_lp", decrypted.toString(CryptoJS.enc.Utf8));
                  } else {
                    localStorage.setItem("data_from_lp", "");
                  }
                  cc.systemEvent.on("GET_QR", (text) => {
                    var qrcodjs = new QRCode(document.getElementById("qrcode"), {
                      text: text,
                      width: 128,
                      height: 128,
                      colorDark: "#000000",
                      colorLight: "#ffffff",
                      correctLevel: QRCode.CorrectLevel.H
                    });
  
                    setTimeout(function () {
                      const base64String = qrcodjs._oDrawing._elCanvas.toDataURL("image/png");
                      cc.systemEvent.emit("RETURN_QR", base64String);
                    }, 100);
                  })
  
                  let settings = window._CCSettings;
                  return cc.game.run(onGameStarted(cc, settings));
                });
            }
          }]);
  
          return Application;
        }());
      }
    };
  
    // #region Game Start and get setting Config
    function onGameStarted(cc, settings) {
      cc.view.resizeWithBrowserSize(true);
      //cc.sys.isMobile ? cc.view._maxPixelRatio = 1.7 : cc.view._maxPixelRatio = 1.3;
      checkHighPixelRatio();
      if (cc.sys.isMobile) {
        if (settings.screen.orientation === 'landscape') {
          cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        } else if (settings.screen.orientation === 'portrait') {
          cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
        }
  
        cc.view.enableAutoFullScreen(false);
      }
  
      if (typeof setFullScreen === 'function') {
        setFullScreen(settings);
      }
  
      var width = settings.screen.designResolution.width;
      var height = settings.screen.designResolution.height;
      cc.view.setDesignResolutionSize(width, height, 4);
  
    }
  
    function checkHighPixelRatio() {
      var limitH = 720;
      var isPortrait = cc.screen.windowSize.width < cc.screen.windowSize.height;
      if (!cc.sys.isMobile) {
        limitH = 1080;
        if (window.devicePixelRatio > 1) {
          window.devicePixelRatio = 1.5;
          cc.director.root.resize(cc.screen.windowSize.width, cc.screen.windowSize.height);
        }
      }
      if (isPortrait) {
        if (cc.screen.windowSize.width > limitH) {
          var width = cc.screen.windowSize.width / window.devicePixelRatio;
          window.devicePixelRatio = limitH / width;
          cc.director.root.resize(cc.screen.windowSize.width, cc.screen.windowSize.height);
        }
      } else {
        if (cc.screen.windowSize.height > limitH) {
          var height = cc.screen.windowSize.height / window.devicePixelRatio;
          window.devicePixelRatio = limitH / height;
          cc.director.root.resize(cc.screen.windowSize.width, cc.screen.windowSize.height);
        }
      }
      console.log("setDevicePixelRatio: ", window.devicePixelRatio);
    }
  
    function loadSettingsJson(cc) {
      var server = '';
      // Replace setting path here
      var settings = 'src/settings.82c45.json';
      return new Promise(function (resolve, reject) {
        if (typeof fsUtils !== 'undefined' && !settings.startsWith('http')) {
          var result = fsUtils.readJsonSync(settings);
  
          if (result instanceof Error) {
            reject(result);
          } else {
            window._CCSettings = result;
            window._CCSettings.server = server;
            resolve();
          }
        } else {
          var requestSettings = function requestSettings() {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', settings);
            xhr.responseType = 'text';
  
            xhr.onload = function () {
              window._CCSettings = JSON.parse(xhr.response);
              window._CCSettings.server = server;
              resolve();
            };
  
            xhr.onerror = function () {
              if (retryCount-- > 0) {
                setTimeout(requestSettings, retryInterval);
              } else {
                reject(new Error('request settings failed!'));
              }
            };
  
            xhr.send(null);
          };
  
          var retryCount = 3;
          var retryInterval = 2000;
          requestSettings();
        }
      });
    }
    // #endregion Game Start and get setting Config
  });
  
  // end copy here