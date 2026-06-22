import java.util.Arrays;
import java.util.Comparator;

public class EcommerceSearch {

    // Linear Search
    public static Product linearSearch(Product[] products, int id) {

        for (Product product : products) {
            if (product.productId == id) {
                return product;
            }
        }
        return null;
    }

    // Binary Search
    public static Product binarySearch(Product[] products, int id) {

        int low = 0;
        int high = products.length - 1;

        while (low <= high) {

            int mid = (low + high) / 2;

            if (products[mid].productId == id)
                return products[mid];

            else if (products[mid].productId < id)
                low = mid + 1;

            else
                high = mid - 1;
        }

        return null;
    }

    public static void main(String[] args) {

        Product[] products = {
                new Product(101, "Laptop", "Electronics"),
                new Product(102, "Mobile", "Electronics"),
                new Product(103, "Shoes", "Fashion"),
                new Product(104, "Watch", "Accessories"),
                new Product(105, "Bag", "Fashion")
        };

        // Linear Search
        Product result1 = linearSearch(products, 103);

        if (result1 != null)
            System.out.println("Linear Search Found: "
                    + result1.productName);

        // Sort for Binary Search
        Arrays.sort(products,
                Comparator.comparingInt(p -> p.productId));

        Product result2 = binarySearch(products, 103);

        if (result2 != null)
            System.out.println("Binary Search Found: "
                    + result2.productName);
    }
}