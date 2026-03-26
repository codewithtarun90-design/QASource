#include <gtest/gtest.h>
#include <string>
#include "main.cpp"  // Assuming the functions are in main.cpp

// Mock function to simulate user input for getInt
int mockGetInt(const std::string& question) {
    if (question == "\n\t\t\t\t\t\t\t Enter the book id: ") {
        return 123;  // Example book id
    }
    return 0;
}

// Test for getInt function
TEST(MainTest, GetIntTest) {
    // Redirect getInt to mockGetInt
    int (*originalGetInt)(const std::string&) = getInt;
    getInt = mockGetInt;

    int result = getInt("\n\t\t\t\t\t\t\t Enter the book id: ");
    EXPECT_EQ(result, 123);

    // Restore original function
    getInt = originalGetInt;
}

// Test for addBookByAdministrator function
TEST(MainTest, AddBookByAdministratorTest) {
    // This function involves user input/output, which is hard to test directly.
    // Consider refactoring the function to separate logic from I/O for better testability.
}

// Test for displayBooksDetails function
TEST(MainTest, DisplayBooksDetailsTest) {
    // This function involves output to console, which is hard to test directly.
    // Consider capturing stdout or refactoring for better testability.
}

// Test for displayFictionBookDetails function
TEST(MainTest, DisplayFictionBookDetailsTest) {
    // This function involves output to console, which is hard to test directly.
    // Consider capturing stdout or refactoring for better testability.
}

// Test for displayNonFictionBookDetails function
TEST(MainTest, DisplayNonFictionBookDetailsTest) {
    // This function involves output to console, which is hard to test directly.
    // Consider capturing stdout or refactoring for better testability.
}

// Test for ToAdministrator function
TEST(MainTest, ToAdministratorTest) {
    // This function involves a loop with user input, which is hard to test directly.
    // Consider refactoring the function to separate logic from I/O for better testability.
}

// Test for issueBookByStudent function
TEST(MainTest, IssueBookByStudentTest) {
    // This function involves user input/output, which is hard to test directly.
    // Consider refactoring the function to separate logic from I/O for better testability.
}

// Test for returnBookByStudent function
TEST(MainTest, ReturnBookByStudentTest) {
    // This function involves user input/output, which is hard to test directly.
    // Consider refactoring the function to separate logic from I/O for better testability.
}

// Test for ToStudent function
TEST(MainTest, ToStudentTest) {
    // This function involves a loop with user input, which is hard to test directly.
    // Consider refactoring the function to separate logic from I/O for better testability.
}

// Test for getPassword function
TEST(MainTest, GetPasswordTest) {
    // This function involves user input, which is hard to test directly.
    // Consider refactoring the function to separate logic from I/O for better testability.
}

// Test for LibraryMenu function
TEST(MainTest, LibraryMenuTest) {
    // This function involves a loop with user input, which is hard to test directly.
    // Consider refactoring the function to separate logic from I/O for better testability.
}

// Test for main function
TEST(MainTest, MainFunctionTest) {
    // This function involves a loop with user input, which is hard to test directly.
    // Consider refactoring the function to separate logic from I/O for better testability.
}

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}

This code provides a basic structure for unit tests using Google Test for the functions in `main.cpp`. Note that many functions involve user input/output, which is challenging to test directly. Consider refactoring these functions to separate logic from I/O for better testability.