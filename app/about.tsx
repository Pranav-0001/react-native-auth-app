import { Stack } from 'expo-router';
import React from 'react';
import { YStack, XStack, Text, Button, Image, Spacer, ScrollView } from 'tamagui';
import ProtectedRoute from '~/components/ProtectedRoute';

const About = () => {
  return (
    <ProtectedRoute>
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <ScrollView
          showsVerticalScrollIndicator={false} // Hide the scrollbar for a cleaner look
          contentContainerStyle={{ paddingTop: 40 }} // Add bottom padding for better scrolling
          backgroundColor="$background">
          <YStack f={1} ai="center" jc="center" padding="$4">
            {/* Header Section */}
            <Text fontSize={36} fontWeight="bold" color="$color" style={{ position: 'static' }}>
              About Us
            </Text>
            <Spacer size="$4" />

            {/* Content Section */}
            <XStack
              space
              padding="$3"
              maxWidth={1200}
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row"
              $sm={{ flexDirection: 'column' }} // This is how we apply media queries in Tamagui
            >
              {/* Left: Image Section */}
              <Image
                src="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
                style={{ width: 300, height: 300 }}
                borderRadius={12}
                alt="About Image"
              />

              {/* Right: Text Section */}
              <YStack
                space="$3"
                maxWidth={600}
                padding="$2"
                alignItems="center"
                $sm={{ alignItems: 'flex-start' }} // Responsive alignItems
              >
                <Text fontSize={24} fontWeight="500" color="$color">
                  We are passionate about creating delightful user experiences
                </Text>
                <Text
                  fontSize={16}
                  color="$color"
                  textAlign="center"
                  $sm={{ textAlign: 'left' }} // Responsive text alignment
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
                <Text fontSize={16} color="$color" textAlign="center" $sm={{ textAlign: 'left' }}>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Text>
                <Text fontSize={16} color="$color" textAlign="center" $sm={{ textAlign: 'left' }}>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Text>

                {/* Call to Action */}
                <Button theme="blue" onPress={() => alert('Learn More!')}>
                  Learn More
                </Button>
              </YStack>
            </XStack>
          </YStack>
        </ScrollView>
      </>
    </ProtectedRoute>
  );
};

export default About;
