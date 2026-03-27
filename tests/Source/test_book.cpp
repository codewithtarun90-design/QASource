#include <gtest/gtest.h>
#include "book.h"

// Test fixture for the Book class
class BookTest : public ::testing::Test {
protected:
    Book book;
};

// Test for setting and getting the name of the book
TEST_F(BookTest, SetAndGetName) {
    book.set_name("Test Book");
    EXPECT_EQ(book.get_name(), "Test Book");
}

// Test for setting and getting the rating of the book
TEST_F(BookTest, SetAndGetRating) {
    book.set_rating(5);
    EXPECT_EQ(book.get_rating(), 5);
}

// Test fixture for the FictionBook class
class FictionBookTest : public ::testing::Test {
protected:
    fiction_book fictionBook;
};

// Test for setting and getting the genre of the fiction book
TEST_F(FictionBookTest, SetAndGetGenre) {
    fictionBook.set_genre("Fantasy");
    EXPECT_EQ(fictionBook.get_genre(), "Fantasy");
}

// Test for displaying details of the fiction book
TEST_F(FictionBookTest, DisplayDetails) {
    fictionBook.set_name("Fiction Book");
    fictionBook.set_genre("Fantasy");
    testing::internal::CaptureStdout();
    fictionBook.displayDetails();
    std::string output = testing::internal::GetCapturedStdout();
    EXPECT_NE(output.find("Fiction Book"), std::string::npos);
    EXPECT_NE(output.find("Fantasy"), std::string::npos);
}

// Test fixture for the NonFictionBook class
class NonFictionBookTest : public ::testing::Test {
protected:
    non_fiction_book nonFictionBook;
};

// Test for setting and getting the subject of the non-fiction book
TEST_F(NonFictionBookTest, SetAndGetSubject) {
    nonFictionBook.set_subject("Science");
    EXPECT_EQ(nonFictionBook.get_subject(), "Science");
}

// Test for displaying details of the non-fiction book
TEST_F(NonFictionBookTest, DisplayDetails) {
    nonFictionBook.set_name("Non-Fiction Book");
    nonFictionBook.set_subject("Science");
    testing::internal::CaptureStdout();
    nonFictionBook.displayDetails();
    std::string output = testing::internal::GetCapturedStdout();
    EXPECT_NE(output.find("Non-Fiction Book"), std::string::npos);
    EXPECT_NE(output.find("Science"), std::string::npos);
}

This code provides unit tests for the `Book`, `fiction_book`, and `non_fiction_book` classes using Google Test. It tests the functionality of setting and getting properties, as well as displaying details.