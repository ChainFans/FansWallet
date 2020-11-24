import {JSEncrypt} from 'jsencrypt'

export function encrypt(str){
    var encrypt = new JSEncrypt();
    var public_key = "<RSAKeyValue><Modulus>qb7SCvNoLzVvOYV795jOAhzJgVmS5sZfa1T4UPXdWwabY4qQvooDL/U1XR8kusLTllpes6IeLXEX8f5voQ+COp3thfekBfAYZSClsJzWsSu13fzQRXYtIR1IqIKlwYUFvtt4AfvGZvvDJxROX4l/fEFu9e99dNlK22ViwyY/ocU=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>";
    encrypt.setPublicKey(public_key);
    return encrypt.encrypt(str);
    }