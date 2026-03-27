#include <gtest/gtest.h>
#include "globals.h"

// Test fixture for Library global array
class LibraryTest : public ::testing::Test {
protected:
    void SetUp() override {
        // Initialize the global array with some test data if needed
        for (int i = 0; i < 2000; ++i) {
            lib[i].set_student_roll_no(i);
        }
    }

    void TearDown() override {
        // Clean up if necessary
    }
};

// Test to check if the global array is initialized correctly
TEST_F(LibraryTest, InitializationTest) {
    for (int i = 0; i < 2000; ++i) {
        EXPECT_EQ(lib[i].get_student_roll_no(), i);
    }
}

// Test to check boundary conditions
TEST_F(LibraryTest, BoundaryTest) {
    EXPECT_EQ(lib[0].get_student_roll_no(), 0);
    EXPECT_EQ(lib[1999].get_student_roll_no(), 1999);
}

// Test to check behavior when accessing out of bounds
TEST_F(LibraryTest, OutOfBoundsTest) {
    // This test is expected to fail or cause undefined behavior
    // because accessing out of bounds is not safe.
    // Uncomment the following lines to test, but be aware of the risks.
    // EXPECT_ANY_THROW(lib[2000].get_student_roll_no());
    // EXPECT_ANY_THROW(lib[-1].get_student_roll_no());
}

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}

This code sets up a Google Test suite for testing the global `Library` array defined in `globals.cpp`. It includes tests for initialization, boundary conditions, and a commented-out test for out-of-bounds access, which is unsafe and typically not recommended.