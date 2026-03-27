#include <gtest/gtest.h>
#include "library.h"

// Test fixture for the Library class
class LibraryTest : public ::testing::Test {
protected:
    Library library;
};

// Test for set_id and get_id
TEST_F(LibraryTest, TestSetAndGetId) {
    library.set_id(123);
    EXPECT_EQ(library.get_id(), 123);
}

// Test for set_book and get_book
TEST_F(LibraryTest, TestSetAndGetBook) {
    library.set_book("The Great Gatsby");
    EXPECT_EQ(library.get_book(), "The Great Gatsby");
}

// Test for set_author and get_author
TEST_F(LibraryTest, TestSetAndGetAuthor) {
    library.set_author("F. Scott Fitzgerald");
    EXPECT_EQ(library.get_author(), "F. Scott Fitzgerald");
}

// Test for set_price and get_price
TEST_F(LibraryTest, TestSetAndGetPrice) {
    library.set_price(299);
    EXPECT_EQ(library.get_price(), 299);
}

// Test for set_pages and get_pages
TEST_F(LibraryTest, TestSetAndGetPages) {
    library.set_pages(180);
    EXPECT_EQ(library.get_pages(), 180);
}

// Test for set_student_name and get_student_name
TEST_F(LibraryTest, TestSetAndGetStudentName) {
    library.set_student_name("John Doe");
    EXPECT_EQ(library.get_student_name(), "John Doe");
}

// Test for set_student_roll_no and get_student_roll_no
TEST_F(LibraryTest, TestSetAndGetStudentRollNo) {
    library.set_student_roll_no(42);
    EXPECT_EQ(library.get_student_roll_no(), 42);
}