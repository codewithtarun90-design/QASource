#include <gtest/gtest.h>
#include "library.h"

class LibraryTest : public ::testing::Test {
protected:
    Library library;
};

TEST_F(LibraryTest, TestSetAndGetId) {
    library.set_id(123);
    EXPECT_EQ(library.get_id(), 123);
}

TEST_F(LibraryTest, TestSetAndGetBook) {
    library.set_book("The Great Gatsby");
    EXPECT_EQ(library.get_book(), "The Great Gatsby");
}

TEST_F(LibraryTest, TestSetAndGetAuthor) {
    library.set_author("F. Scott Fitzgerald");
    EXPECT_EQ(library.get_author(), "F. Scott Fitzgerald");
}

TEST_F(LibraryTest, TestSetAndGetPrice) {
    library.set_price(299);
    EXPECT_EQ(library.get_price(), 299);
}

TEST_F(LibraryTest, TestSetAndGetPages) {
    library.set_pages(180);
    EXPECT_EQ(library.get_pages(), 180);
}

TEST_F(LibraryTest, TestSetAndGetStudentName) {
    library.set_student_name("John Doe");
    EXPECT_EQ(library.get_student_name(), "John Doe");
}

TEST_F(LibraryTest, TestSetAndGetStudentRollNo) {
    library.set_student_roll_no(456);
    EXPECT_EQ(library.get_student_roll_no(), 456);
}