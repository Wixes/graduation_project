const btoa = require('btoa');

module.exports = {
    base64pic: (buffer) => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));

        bytes.forEach((b) => binary += String.fromCharCode(b));

        const result = btoa(binary);
        return result;

    }
}