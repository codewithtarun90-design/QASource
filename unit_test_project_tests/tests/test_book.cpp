#include <gtest/gtest.h>
#include "book.h" // Assuming book.h is the header file for book.cpp

// Test fixture for Book class
class BookTest : public ::testing::Test {
protected:
    // You can define variables and methods here that can be used in the tests
    Book book;

    void SetUp() override {
        // Code here will be called immediately after the constructor (right before each test).
    }

    void TearDown() override {
        // Code here will be called immediately after each test (right before the destructor).
    }
};

// Test case for the default constructor
TEST_F(BookTest, DefaultConstructor) {
    EXPECT_EQ(book.getTitle(), ""); // Assuming getTitle() returns the title of the book
    EXPECT_EQ(book.getAuthor(), ""); // Assuming getAuthor() returns the author of the book
    EXPECT_EQ(book.getPages(), 0); // Assuming getPages() returns the number of pages
}

// Test case for setting and getting the title
TEST_F(BookTest, SetAndGetTitle) {
    book.setTitle("Test Title");
    EXPECT_EQ(book.getTitle(), "Test Title");
}

// Test case for setting and getting the author
TEST_F(BookTest, SetAndGetAuthor) {
    book.setAuthor("Test Author");
    EXPECT_EQ(book.getAuthor(), "Test Author");
}

// Test case for setting and getting the number of pages
TEST_F(BookTest, SetAndGetPages) {
    book.setPages(123);
    EXPECT_EQ(book.getPages(), 123);
}

// Test case for edge case: setting negative pages
TEST_F(BookTest, SetNegativePages) {
    book.setPages(-10);
    EXPECT_EQ(book.getPages(), 0); // Assuming negative pages are not allowed and default to 0
}