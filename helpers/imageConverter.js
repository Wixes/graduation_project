const btoa = require('btoa');

module.exports = {
    // convert the image from binary(b) to ASCII(a)
    // ASCII - is the result of base64 encoding
    // binary - is any stream of a string type
    base64pic: (buffer) => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));

        bytes.forEach((b) => binary += String.fromCharCode(b));

        const result = btoa(binary);
        return result;

    }
}