#include <gtest/gtest.h>
#include "book.h"

// Test fixture for Book class
class BookTest : public ::testing::Test {
protected:
    Book book;
};

// Test set_name and get_name methods
TEST_F(BookTest, SetAndGetName) {
    book.set_name("Test Book");
    EXPECT_EQ(book.get_name(), "Test Book");
}

// Test set_rating and get_rating methods
TEST_F(BookTest, SetAndGetRating) {
    book.set_rating(5);
    EXPECT_EQ(book.get_rating(), 5);
}

// Test fixture for fiction_book class
class FictionBookTest : public ::testing::Test {
protected:
    fiction_book fbook;
};

// Test set_genre and get_genre methods
TEST_F(FictionBookTest, SetAndGetGenre) {
    fbook.set_genre("Fantasy");
    EXPECT_EQ(fbook.get_genre(), "Fantasy");
}

// Test displayDetails method for fiction_book
TEST_F(FictionBookTest, DisplayDetails) {
    fbook.set_name("Fiction Book");
    fbook.set_genre("Fantasy");
    testing::internal::CaptureStdout();
    fbook.displayDetails();
    std::string output = testing::internal::GetCapturedStdout();
    EXPECT_NE(output.find("The book name: Fiction Book"), std::string::npos);
    EXPECT_NE(output.find("The genre: Fantasy"), std::string::npos);
}

// Test fixture for non_fiction_book class
class NonFictionBookTest : public ::testing::Test {
protected:
    non_fiction_book nfbook;
};

// Test set_subject and get_subject methods
TEST_F(NonFictionBookTest, SetAndGetSubject) {
    nfbook.set_subject("Science");
    EXPECT_EQ(nfbook.get_subject(), "Science");
}

// Test displayDetails method for non_fiction_book
TEST_F(NonFictionBookTest, DisplayDetails) {
    nfbook.set_name("Non-Fiction Book");
    nfbook.set_subject("Science");
    testing::internal::CaptureStdout();
    nfbook.displayDetails();
    std::string output = testing::internal::GetCapturedStdout();
    EXPECT_NE(output.find("The book name: Non-Fiction Book"), std::string::npos);
    EXPECT_NE(output.find("The subject: Science"), std::string::npos);
}