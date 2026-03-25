#include <gtest/gtest.h>
#include "book.h" // Assuming book.h is the header file for book.cpp

class BookTest : public ::testing::Test {
protected:
    Book book;
    fiction_book fictionBook;
    non_fiction_book nonFictionBook;
};

TEST_F(BookTest, SetAndGetRating_ShouldReturnCorrectRating) {
    book.set_rating(5);
    EXPECT_EQ(book.get_rating(), 5);
}

TEST_F(BookTest, SetAndGetName_ShouldReturnCorrectName) {
    book.set_name("Test Book");
    EXPECT_EQ(book.get_name(), "Test Book");
}

TEST_F(BookTest, FictionBook_SetAndGetGenre_ShouldReturnCorrectGenre) {
    fictionBook.set_genre("Fantasy");
    EXPECT_EQ(fictionBook.get_genre(), "Fantasy");
}

TEST_F(BookTest, NonFictionBook_SetAndGetSubject_ShouldReturnCorrectSubject) {
    nonFictionBook.set_subject("Science");
    EXPECT_EQ(nonFictionBook.get_subject(), "Science");
}

TEST_F(BookTest, FictionBook_DisplayDetails_ShouldOutputCorrectDetails) {
    fictionBook.set_name("Fiction Book");
    fictionBook.set_rating(4);
    fictionBook.set_genre("Adventure");

    testing::internal::CaptureStdout();
    fictionBook.displayDetails();
    std::string output = testing::internal::GetCapturedStdout();

    EXPECT_NE(output.find("The book name: Fiction Book"), std::string::npos);
    EXPECT_NE(output.find("The rating: 4"), std::string::npos);
    EXPECT_NE(output.find("The genre: Adventure"), std::string::npos);
}

TEST_F(BookTest, NonFictionBook_DisplayDetails_ShouldOutputCorrectDetails) {
    nonFictionBook.set_name("Non-Fiction Book");
    nonFictionBook.set_rating(3);
    nonFictionBook.set_subject("History");

    testing::internal::CaptureStdout();
    nonFictionBook.displayDetails();
    std::string output = testing::internal::GetCapturedStdout();

    EXPECT_NE(output.find("The book name: Non-Fiction Book"), std::string::npos);
    EXPECT_NE(output.find("The rating: 3"), std::string::npos);
    EXPECT_NE(output.find("The subject: History"), std::string::npos);
}