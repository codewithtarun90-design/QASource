#include <gtest/gtest.h>
#include "book.h"

class BookTest : public ::testing::Test {
protected:
    Book book;
    fiction_book fictionBook;
    non_fiction_book nonFictionBook;
};

TEST_F(BookTest, SetAndGetBookName) {
    book.set_name("Test Book");
    EXPECT_EQ(book.get_name(), "Test Book");
}

TEST_F(BookTest, SetAndGetBookRating) {
    book.set_rating(5);
    EXPECT_EQ(book.get_rating(), 5);
}

TEST_F(BookTest, SetAndGetFictionBookGenre) {
    fictionBook.set_genre("Fantasy");
    EXPECT_EQ(fictionBook.get_genre(), "Fantasy");
}

TEST_F(BookTest, SetAndGetNonFictionBookSubject) {
    nonFictionBook.set_subject("Science");
    EXPECT_EQ(nonFictionBook.get_subject(), "Science");
}

TEST_F(BookTest, FictionBookDisplayDetails) {
    fictionBook.set_name("Fiction Book");
    fictionBook.set_genre("Adventure");
    testing::internal::CaptureStdout();
    fictionBook.displayDetails();
    std::string output = testing::internal::GetCapturedStdout();
    EXPECT_NE(output.find("The book name: Fiction Book"), std::string::npos);
    EXPECT_NE(output.find("The genre: Adventure"), std::string::npos);
}

TEST_F(BookTest, NonFictionBookDisplayDetails) {
    nonFictionBook.set_name("Non-Fiction Book");
    nonFictionBook.set_subject("History");
    testing::internal::CaptureStdout();
    nonFictionBook.displayDetails();
    std::string output = testing::internal::GetCapturedStdout();
    EXPECT_NE(output.find("The book name: Non-Fiction Book"), std::string::npos);
    EXPECT_NE(output.find("The subject: History"), std::string::npos);
}

This code provides unit tests for the `Book`, `fiction_book`, and `non_fiction_book` classes using Google Test. It tests the setting and getting of names, ratings, genres, and subjects, as well as the display details functionality.