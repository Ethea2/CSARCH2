import java.util.Scanner;
import java.io.FileWriter;
import java.io.IOException;

public class Binary32 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            System.out.println("Enter a binary mantissa and exponent (format: mantissax2^exponent):");
            String input1 = scanner.nextLine();
            if (input1.isEmpty()) {
                throw new IllegalArgumentException("Input cannot be empty.");
            }
            String[] parts1 = input1.split("x2\\\\^");
            if (parts1.length != 2) {
                throw new IllegalArgumentException("Invalid format. Please enter in the format: mantissax2^exponent");
            }
            String binaryMantissa = parts1[0].trim();
            if (!binaryMantissa.matches("[01]+")) {
                throw new IllegalArgumentException("Invalid mantissa. Mantissa should only contain 0s and 1s.");
            }
            int exponent1 = Integer.parseInt(parts1[1].trim());

            System.out.println("Enter a decimal and exponent (format: decimalx10^exponent):");
            String input2 = scanner.nextLine();
            if (input2.isEmpty()) {
                throw new IllegalArgumentException("Input cannot be empty.");
            }
            String[] parts2 = input2.split("x10\\\\^");
            if (parts2.length != 2) {
                throw new IllegalArgumentException("Invalid format. Please enter in the format: decimalx10^exponent");
            }
            float decimal = Float.parseFloat(parts2[0].trim());
            if (Float.isNaN(decimal)) {
                throw new IllegalArgumentException("Invalid decimal. Decimal cannot be NaN.");
            }
            int exponent2 = Integer.parseInt(parts2[1].trim());
        } catch (NumberFormatException e) {
            System.out.println("Invalid number format. Please make sure you're entering numbers correctly.");
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}
