#include <gtest/gtest.h>
#include "globals.h"

// Test fixture for the Library array
class LibraryArrayTest : public ::testing::Test {
protected:
    void SetUp() override {
        // Initialize the Library array with some test data if needed
        for (int i = 0; i < 2000; ++i) {
            lib[i].id = i;
            lib[i].title = "Title " + std::to_string(i);
            lib[i].author = "Author " + std::to_string(i);
            lib[i].isAvailable = true;
        }
    }
};

// Test to check the size of the Library array
TEST_F(LibraryArrayTest, ArraySizeTest) {
    EXPECT_EQ(sizeof(lib) / sizeof(lib[0]), 2000);
}

// Test to check if all books are initialized as available
TEST_F(LibraryArrayTest, AllBooksAvailableTest) {
    for (int i = 0; i < 2000; ++i) {
        EXPECT_TRUE(lib[i].isAvailable);
    }
}

// Test to check if the titles are correctly initialized
TEST_F(LibraryArrayTest, TitlesInitializationTest) {
    for (int i = 0; i < 2000; ++i) {
        EXPECT_EQ(lib[i].title, "Title " + std::to_string(i));
    }
}

// Test to check if the authors are correctly initialized
TEST_F(LibraryArrayTest, AuthorsInitializationTest) {
    for (int i = 0; i < 2000; ++i) {
        EXPECT_EQ(lib[i].author, "Author " + std::to_string(i));
    }
}

// Test to check if the IDs are correctly initialized
TEST_F(LibraryArrayTest, IDsInitializationTest) {
    for (int i = 0; i < 2000; ++i) {
        EXPECT_EQ(lib[i].id, i);
    }
}