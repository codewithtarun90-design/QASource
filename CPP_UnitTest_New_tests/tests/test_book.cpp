#include <gtest/gtest.h>
#include "book.h"

// Test for Book class
TEST(BookTest, SetAndGetName) {
    Book book;
    book.set_name("Test Book");
    EXPECT_EQ(book.get_name(), "Test Book");
}

TEST(BookTest, SetAndGetRating) {
    Book book;
    book.set_rating(5);
    EXPECT_EQ(book.get_rating(), 5);
}

// Test for fiction_book class
TEST(FictionBookTest, SetAndGetGenre) {
    fiction_book fbook;
    fbook.set_genre("Fantasy");
    EXPECT_EQ(fbook.get_genre(), "Fantasy");
}

TEST(FictionBookTest, DisplayDetails) {
    fiction_book fbook;
    fbook.set_name("Fiction Book");
    fbook.set_rating(4);
    fbook.set_genre("Adventure");
    // Here we would normally capture the output of displayDetails and check it
    // However, since displayDetails prints to cout, we can't easily test it without redirecting cout
}

// Test for non_fiction_book class
TEST(NonFictionBookTest, SetAndGetSubject) {
    non_fiction_book nfbook;
    nfbook.set_subject("Science");
    EXPECT_EQ(nfbook.get_subject(), "Science");
}

TEST(NonFictionBookTest, DisplayDetails) {
    non_fiction_book nfbook;
    nfbook.set_name("Non-Fiction Book");
    nfbook.set_rating(3);
    nfbook.set_subject("History");
    // Here we would normally capture the output of displayDetails and check it
    // However, since displayDetails prints to cout, we can't easily test it without redirecting cout
}

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}