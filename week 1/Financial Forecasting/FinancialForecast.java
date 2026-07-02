public class FinancialForecast {

    // Recursive method to calculate future value
    public static double futureValue(double presentValue,
                                     double growthRate,
                                     int years) {

        // Base Case
        if (years == 0) {
            return presentValue;
        }

        // Recursive Case
        return futureValue(
                presentValue,
                growthRate,
                years - 1
        ) * (1 + growthRate);
    }

    public static void main(String[] args) {

        double presentValue = 10000; // Initial investment
        double growthRate = 0.10;    // 10%
        int years = 5;

        double result = futureValue(
                presentValue,
                growthRate,
                years
        );

        System.out.println("Future Value after "
                + years + " years = "
                + result);
    }
}