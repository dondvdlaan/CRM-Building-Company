package server.CRM.Building.Company.helper;

import org.apache.commons.codec.binary.Hex;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

public class Helper {

    /**
     * Method to verify the given password against the hashed pw from database
     *
     * @param userPW        [String]    : password to be verified
     * @param hashedPW      [String]    : hashed password for comparison
     * @return verifiedPW   [boolean]   : true-> pw is correct, false-> pw incorrect
     */
    public static boolean verifyPassword(String userPW, String hashedPW){

        // *** Constants and variables ***
        boolean verifiedPW      = false;
        String password 	    = userPW;
        String salt 		    = "5678";
        int iterations 		    = 10000;
        int keyLength 		    = 512;
        char[] passwordChars 	= password.toCharArray();
        byte[] saltBytes 	    = salt.getBytes();

        // Hash pw and check with pw from database
        byte[] hashedBytes 	    = hashPassword(passwordChars, saltBytes, iterations, keyLength);
        String hashedString 	= Hex.encodeHexString(hashedBytes);

        if (hashedString.equals(hashedPW)) verifiedPW = true;

    return verifiedPW;
    }


// *** Methodes ***

    /**
     * Method to generate a hashed password. With courtesy of Mr. K. Dharmadasa at
     * https://medium.com/@kasunpdh/how-to-store-passwords-securely-with-pbkdf2-204487f14e84
     *
     * @param password      [char[]]    : Password to be hashed
     * @param salt          [byte[]]    : Salt to be added to make Password unique
     * @param iterations    [int]       : iterations to generate hashed pw
     * @param keyLength     [int]       : output length of the hashed function
     * @return res          [byte[]]    : hashed PW
     */
    public static byte[] hashPassword(final char[] password,
                                      final byte[] salt,
                                      final int iterations,
                                      final int keyLength ) {

        try {
            SecretKeyFactory skf 	= SecretKeyFactory.getInstance( "PBKDF2WithHmacSHA512" );
            PBEKeySpec spec 		= new PBEKeySpec( password, salt, iterations, keyLength );
            SecretKey key 		    = skf.generateSecret( spec );
            byte[] res 			    = key.getEncoded( );

            return res;
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e ) {
            throw new RuntimeException( e );
        }
    }
}
