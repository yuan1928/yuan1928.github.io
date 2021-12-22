import React from "react";
import NavBar from "../common/NavBar/NavBar";
import SideBar from "../common/SideBar/SideBar";
import PlayBar from "../common/PlayBar/PlayBar";
import UserPage from "./UserPage/UserPage";
import SearchPage from "./SearchPage/SearchPage";
import DetailPage from "./DetailPage/DetailPage";
import SongListPage from "./SongListPage/SongListPage";
import AlbumPage from "./AlbumPage/AlbumPage";
import Login from "./LoginPage/Login";
import EventEmitter from "events";
import './MainPage.css'
//import {Router} from "react-router";
import {BrowserRouter, Route, Redirect, Switch, withRouter} from "react-router-dom";

const playMusicEvent=new EventEmitter()
const playWithLyrics=new EventEmitter()
const playMusicOfSongList=new EventEmitter()
const playSingleSong=new EventEmitter()
const playAlbumSong=new EventEmitter()
const loginEvent=new EventEmitter()

class User extends React.Component<any, any>{
    render() {
        return (
            <>
                <SideBar/>
                <div id="content">
                    <UserPage/>
                </div>
            </>
        )
    }
}
class Search extends React.Component<any, any>{
    render() {
        return (
            <>
                <SideBar/>
                <div id="content">
                    <SearchPage playMusicEvent={playMusicEvent} />
                </div>
            </>
        )
    }
}
class Detail extends React.Component<any, any>{
    render() {
        return (
            <DetailPage  playWithLyricsEvent={playWithLyrics}/>
        )
    }
}
class SongList extends React.Component<any, any>{
    render() {
        return (
            <>
                <SideBar/>
                <div id="content">
                    <SongListPage playSongListEvent={playMusicOfSongList} />
                </div>
            </>
        )
    }
}
class Album extends React.Component<any, any>{
    render() {
        return (
            <>
                <SideBar/>
                <div id="content">
                    <AlbumPage />
                </div>
            </>
        )
    }
}


let isLogin=false
class MainPage extends React.Component<any, any>{
    componentDidMount() {
        loginEvent.addListener("login",()=>{isLogin=true})
        loginEvent.addListener("logout",()=>{isLogin=false})
    }

    render() {
        return (
            <BrowserRouter>
                <div id="root">

                    <div id="top">
                        <NavBar  />
                    </div>
                    <div id="center">
                        <Switch>
                            <Route path="/user" component={User}/>
                            <Route path="/search/:keyword/:selectedRow" component={Search}/>
                            <Route path="/detail/:id/:keyword" component={Detail}/>
                            <Route path="/song-list/:id" component={SongList}/>
                            <Route path="/album/:id" component={Album}/>
                            <Route path="/login" component={Login}/>
                            <Redirect to="/user"/>
                        </Switch>
                    </div>
                    <div id="bottom">
                        <PlayBar
                                    playMusicEvent={playMusicEvent}
                                    playWithLyricsEvent={playWithLyrics}
                                    playSongListEvent={playMusicOfSongList}
                                    playSingleSongEvent={playSingleSong}
                                    playAlbumSongEvent={playAlbumSong}
                        />
                    </div>
                </div>
            </BrowserRouter>

        )
    }
}

export default withRouter(MainPage)
export {playMusicOfSongList,playSingleSong,playMusicEvent,playAlbumSong,isLogin,loginEvent}