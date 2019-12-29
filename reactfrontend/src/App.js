import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      likes: false,
      currentLikes: this.props.likes
    }
  }

  toggleLikes = async () => {
    await this.setState({likes: !this.state.likes}) 
    if (this.state.likes) {
      this.setState({currentLikes: this.state.currentLikes+1}) 
    } else {
      this.setState({currentLikes: this.state.currentLikes-1}) 
    }
    await api.putLikes({
              title: this.props.title,
              content: this.props.content,
              likes: this.state.currentLikes
            }, this.props.id)
  }

  handlingDelete = async (id) => {
    await api.deletePost(id)
    this.setState({show: false})
  }

  render() {
    if (this.state.show) {
        return (
          <Card className={'card'}>
            <CardContent>
              <Typography className={'card-title'} color="textSecondary" gutterBottom>
                {this.props.id}번째 대나무
              </Typography>
              <Typography variant="h5" component="h2">
                <PostView
                key={this.props.id}
                title={this.props.title}
                content={this.props.content}
                />
              </Typography>
              <FormControlLabel
                  control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
                  label={this.state.currentLikes}
                  onChange={this.toggleLikes}
              />
          </CardContent>
          <CardActions>
            <Button value={this.props.id} onClick={(event) => this.handlingDelete(this.props.id)} color="secondary" size="small">삭제하기</Button>
          </CardActions>
        </Card>

        )
       
    } else {
      return ([])
    }
 }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      content: "",
      results: [],
    }
  }


  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
    const _results = await api.getAllPosts()
    console.log(_results)
    // this.setState({results: _results.data})
    this.setState({results: _results.data})
  }

  handlingChange = (event) => {
    this.setState({[event.target.name]: event.target.value})    
  }

  handlingDelete = async (id) => {
    await api.deletePost(id)
    this.getPosts()
  }

  handlingSubmit = async (event) => {
    event.preventDefault() // event의 기본적인 기능을 하지않게 함
    let result = await api.createPost(
      {
        title: this.state.title,
        content: this.state.content,
      }
    );
    console.log("작성 완료!", result);
    this.setState({title: '', content: ''})
    this.getPosts()
  }

  render() {
    return (
      <div className="App">
        <Container maxWidth="lg">
          <div className="PostingSection">
            <Paper className="PostingPaper">
              <h2>대나무 숲 글 작성하기</h2>
              <form className="PostingForm" onSubmit={this.handlingSubmit}>
                <TextField
                  id="outlined-name"
                  label="글 제목"
                  name="title"
                  value={this.state.title}
                  onChange={this.handlingChange}
                  margin="normal"
                  variant="outlined"
                />

                {/* <br /> */}

                {/* <textarea 
                  name="content"
                  value={this.state.content}
                  onChange={this.handlingChange}
                /> */}

                <TextField
                  id="outlined-name"
                  label="본문"
                  name="content"
                  multiline
                  rowsMax="4"
                  value={this.state.content}
                  onChange={this.handlingChange}
                  margin="normal"
                  variant="outlined"
                />

                {/* <br /> */}
                
                <Button variant="outlined" color="primary" type="submit">제출하기</Button>
              </form>
            </Paper>
          </div>

          {this.state.results.map((post) =>
             <Post
              id={post.id}
              title={post.title}
              content={post.content}
              likes={post.likes}
            />)}
                  
        </Container>
      </div>
    )
  }
}

export default App;
