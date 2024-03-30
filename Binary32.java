import java.util.Scanner;

public class Binary32 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input1 = "";
        String input2 = "";

        try {
            System.out.println("Enter a binary mantissa and exponent (format: mantissax2^exponent):");
            input1 = scanner.nextLine();

            System.out.println("Enter a decimal and exponent (format: decimalx10^exponent):");
            input2 = scanner.nextLine();

            if (input1.isEmpty() && input2.isEmpty()) {
                throw new IllegalArgumentException("Both inputs are empty. At least one should be filled up.");
            }

            if (!input1.isEmpty()) {
                String[] parts1 = input1.split("x2\\\\^");
                if (parts1.length != 2) {
                    throw new IllegalArgumentException("Invalid format. Please enter in the format: mantissax2^exponent");
                }
                String binaryMantissa = parts1[0].trim();
                if (!binaryMantissa.matches("[01]+")) {
                    throw new IllegalArgumentException("Invalid mantissa. Mantissa should only contain 0s and 1s.");
                }
                int exponent1 = Integer.parseInt(parts1[1].trim());
            }

            if (!input2.isEmpty()) {
                String[] parts2 = input2.split("x10\\\\^");
                if (parts2.length != 2) {
                    throw new IllegalArgumentException("Invalid format. Please enter in the format: decimalx10^exponent");
                }
                float decimal = Float.parseFloat(parts2[0].trim());
                if (Float.isNaN(decimal)) {
                    throw new IllegalArgumentException("Invalid decimal. Decimal cannot be NaN.");
                }
                int exponent2 = Integer.parseInt(parts2[1].trim());
            }
        } catch (NumberFormatException e) {
            System.out.println("Invalid number format. Please make sure you're entering numbers correctly.");
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}

