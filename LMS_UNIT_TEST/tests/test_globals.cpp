#include <gtest/gtest.h>
#include "globals.h"

// Test fixture for the Library array
class LibraryArrayTest : public ::testing::Test {
protected:
    void SetUp() override {
        // Initialize the Library array with some test data if needed
        for (int i = 0; i < 2000; ++i) {
            lib[i].id = i;
            lib[i].name = "Test Book " + std::to_string(i);
            lib[i].author = "Author " + std::to_string(i);
        }
    }
};

// Test to check the size of the Library array
TEST_F(LibraryArrayTest, ArraySize) {
    EXPECT_EQ(sizeof(lib) / sizeof(lib[0]), 2000);
}

// Test to check if the Library array is initialized correctly
TEST_F(LibraryArrayTest, Initialization) {
    for (int i = 0; i < 2000; ++i) {
        EXPECT_EQ(lib[i].id, i);
        EXPECT_EQ(lib[i].name, "Test Book " + std::to_string(i));
        EXPECT_EQ(lib[i].author, "Author " + std::to_string(i));
    }
}

// Test to check boundary conditions
TEST_F(LibraryArrayTest, BoundaryConditions) {
    EXPECT_NO_THROW({
        lib[0].id = 0;
        lib[1999].id = 1999;
    });
}

// Test to check accessing out of bounds
TEST_F(LibraryArrayTest, OutOfBoundsAccess) {
    EXPECT_ANY_THROW({
        Library outOfBounds = lib[2000]; // This should throw an error
    });
}