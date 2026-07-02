DECLARE
    CURSOR c_customers IS
        SELECT c.CustomerID,
               c.DOB,
               l.LoanID,
               l.InterestRate
        FROM Customers c
        JOIN Loans l
        ON c.CustomerID = l.CustomerID;

    v_age NUMBER;
BEGIN
    FOR rec IN c_customers LOOP

        v_age := FLOOR(MONTHS_BETWEEN(SYSDATE, rec.DOB) / 12);

        IF v_age > 60 THEN
            UPDATE Loans
            SET InterestRate = InterestRate - 1
            WHERE LoanID = rec.LoanID;

            DBMS_OUTPUT.PUT_LINE(
                'Discount applied for Customer ID: ' ||
                rec.CustomerID
            );
        END IF;

    END LOOP;

    COMMIT;
END;
/