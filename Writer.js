module.exports = class {
    constructor(size, littleEndian) {
        this.dataView = new DataView(new ArrayBuffer(size));
        this.littleEndian = littleEndian;
        this.byteOffset = 0;
    };
    writeInt8(value) {
        this.dataView.setUint8(this.byteOffset++, value);
    };
    writeUint8(value) {
        this.dataView.setUint8(this.byteOffset++, value)
    };
    writeInt16(value) {
        this.dataView.setInt16(this.byteOffset, value, this.littleEndian);
        this.byteOffset += 2;
    };
    writeUint16(value) {
        this.dataView.setUint16(this.byteOffset, value, this.littleEndian);
        this.byteOffset += 2;
    };
    writeInt32(value) {
        this.dataView.setInt32(this.byteOffset, value, this.littleEndian);
        this.byteOffset += 4;
    };
    writeUint32(value) {
        this.dataView.setUint32(this.byteOffset, value, this.littleEndian);
        this.byteOffset += 4;
    };
    writeString(string) {
        for (let i = 0; i < string.length; i++) this.writeUint8(string.charCodeAt(i));
        this.writeUint8(0);
    };
};