import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ReviewItem {
  id: string;
  content: string;
  date: string;
  rating: number;
  author: {
    name: string;
  };
}

interface ReviewsData {
  summary: {
    averageRating: number;
    totalReviews: number;
    distribution: { [stars: number]: number };
  };
  items: ReviewItem[];
  actions: {
    canAddReview: boolean;
  };
}

interface ReviewSectionProps {
  reviews: ReviewsData;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
  const { summary, items, actions } = reviews;
  const sortedDistribution = Object.entries(summary.distribution).sort((a, b) => Number(b[0]) - Number(a[0]));

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Reviews</Text>
        {actions.canAddReview && (
          <TouchableOpacity>
            <Text style={styles.addReview}>+ Add Review</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Summary & Rating Distribution in the Same Line */}
      <View style={styles.summaryRow}>
        <View style={styles.ratingContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.averageRating}>{summary.averageRating.toFixed(1)}</Text>
            <Icon name="star" size={30} color="#006400" style={styles.starIcon} />
          </View>

          <View style={styles.totalReviewsBadge}>
            <Text style={styles.totalReviewsText}>{summary.totalReviews} reviews</Text>
          </View>
        </View>
        <View style={styles.distributionContainer}>
          {sortedDistribution.map(([stars, count]) => (
            <View key={stars} style={styles.distributionRow}>
              <Text style={styles.starsText}>{stars}★</Text>
              <View style={styles.barBackground}>
                <View
                  style={[
                    styles.barForeground,
                    { width: `${((count as number) / summary.totalReviews) * 100}%` },
                  ]}
                />
              </View>
              <Text style={styles.countText}>{count}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Reviews List */}
      <FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.authorContainer}>
        <View style={styles.authorAvatar}>
          <Text style={styles.avatarText}>{item.author.name.charAt(0)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.authorName}>{item.author.name}</Text>
          <Text style={styles.reviewContent}>{item.content}</Text>
        </View>
        <View style={styles.ratingAndDate}>
          <View style={styles.starsRow}>
            {Array.from({ length: item.rating }).map((_, index) => (
              <Icon key={index} name="star" size={15} color="#F3C623" />
            ))}
          </View>
        </View>
      </View>
    </View>
  )}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  addReview: {
    fontSize: 14,
    color: '#006400',
    fontWeight: 'bold',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  averageRating: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  starIcon: {
    marginTop: 4,
  },
  totalReviewsBadge: {
    backgroundColor: 'black',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  totalReviewsText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  distributionContainer: {
    flex: 1,
    marginLeft: 20,
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsText: {
    width: 30,
    fontSize: 14,
    color: 'black',
  },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginHorizontal: 10,
  },
  barForeground: {
    height: 8,
    backgroundColor: '#006400', 
    borderRadius: 4,
  },
  countText: {
    width: 40,
    fontSize: 14,
    color: '#555',
  },
  reviewItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
    marginBottom: 8,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#006400', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  reviewContent: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  ratingAndDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
  },
});

export default ReviewSection;