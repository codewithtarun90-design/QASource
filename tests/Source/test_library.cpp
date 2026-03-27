#include <gtest/gtest.h>
#include "library.h"

class LibraryTest : public ::testing::Test {
protected:
    Library library;
};

TEST_F(LibraryTest, SetAndGetId) {
    library.set_id(123);
    EXPECT_EQ(library.get_id(), 123);
}

TEST_F(LibraryTest, SetAndGetBookName) {
    library.set_book("The Great Gatsby");
    EXPECT_EQ(library.get_book(), "The Great Gatsby");
}

TEST_F(LibraryTest, SetAndGetAuthorName) {
    library.set_author("F. Scott Fitzgerald");
    EXPECT_EQ(library.get_author(), "F. Scott Fitzgerald");
}

TEST_F(LibraryTest, SetAndGetPrice) {
    library.set_price(299);
    EXPECT_EQ(library.get_price(), 299);
}

TEST_F(LibraryTest, SetAndGetPages) {
    library.set_pages(180);
    EXPECT_EQ(library.get_pages(), 180);
}

TEST_F(LibraryTest, SetAndGetStudentName) {
    library.set_student_name("John Doe");
    EXPECT_EQ(library.get_student_name(), "John Doe");
}

TEST_F(LibraryTest, SetAndGetStudentRollNo) {
    library.set_student_roll_no(456);
    EXPECT_EQ(library.get_student_roll_no(), 456);
}

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}