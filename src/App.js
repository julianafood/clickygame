import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import Scores from "./components/Scores";

class App extends Component {
  state = {
    friends: friends,
    score: 0,
    top_score: 0
  };

  componentWillMount() {
    
    let friends = this.initSelected();
    this.setState({ friends: friends });
  }


  initSelected = () => {
    let friends = this.state.friends.map(friend => {
      friend.selected = false;
      return friend;
    });

    return friends;
  };

  shuffle = array => {
    console.log("shuffle");
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    }
  };

  selectFriend = id => {
    console.log("selected id : " + id);

    const friend = this.state.friends.filter(friend => friend.id === id);
    console.log("Matching friend : " + JSON.stringify(friend));

    console.log("Selected ? " + friend[0].selected);
    let friends;
    let score = this.state.score;
    let top_score = this.state.top_score;

    if (friend[0].selected === true) {
      console.log("Friend already selected!!");
      score = 0;
      friends = this.initSelected();
    } else {
      console.log("Not yet selected.");
      score = score + 1;

      if (score > top_score) {
        top_score = score;
      }

      friends = this.state.friends.map(friend => {
        if (friend.id === id) {
          console.log("Setting friend id " + id + " to selected.");
          friend.selected = true;
        }
        return friend;
      });
    }

    this.shuffle(friends);

    this.setState({
      friends: friends,
      score: score,
      top_score: top_score
    });

  };

  render() {
    console.log("rendering");
    console.log("score : " + this.state.score);
    console.log("top_score : " + this.state.top_score);

    return (
      <Wrapper>
        <Title>Friends List</Title>
        <Scores>Score {this.state.score}| Top Score {this.state.top_score}</Scores>
        {this.state.friends.map(friend => (
          <FriendCard
            selectFriend={this.selectFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
