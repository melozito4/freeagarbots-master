module.exports = class {
    constructor(buffer, littleEndian){
        this.dataView = new DataView(buffer);
        this.byteOffset = 0;
        this.littleEndian = littleEndian;
    };
    readInt8(){
        return this.dataView.getInt8(this.byteOffset++);
    };
    readUint8(){
        return this.dataView.getUint8(this.byteOffset++);
    };
    readInt16(){
        const value = this.dataView.getInt16(this.byteOffset, this.littleEndian);
        this.byteOffset += 2;
        return value;
    };
    readUint16(){
        const value = this.dataView.getUint16(this.byteOffset, this.littleEndian);
        this.byteOffset += 2;
        return value;
    };
    readInt32(){
        const value = this.dataView.getInt32(this.byteOffset, this.littleEndian);
        this.byteOffset += 4;
        return value;
    };
    readUint32(){
        const value = this.dataView.getUint32(this.byteOffset, this.littleEndian);
        this.byteOffset += 4;
        return value;
    };
    readFloat32(){
        const value = this.dataView.getFloat32(this.byteOffset, this.littleEndian);
        this.byteOffset += 8;
        return value;
    };
    readFloat64(){
        const value = this.dataView.getFloat64(this.byteOffset, this.littleEndian);
        this.byteOffset += 8;
        return value;
    };
    readString(){
        let string = '';
        while(true) {
            const charCode = this.readUint8();
            if(charCode === 0) break;
            string += String.fromCharCode(charCode);
        };
        return decodeURIComponent(escape(string));
    };
};