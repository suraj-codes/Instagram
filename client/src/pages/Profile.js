import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PostPreview from "../components/PostPreview";
import ProfileHeader from "../components/ProfileHeader";
import Placeholder from "../components/Placeholder";
import Loader from "../components/Loader";
import { PostIcon, SavedIcon } from "../components/Icons";
import { client } from "../utils";
import NewPost from "../components/NewPost"
const Wrapper = styled.div`
  .profile-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1.4rem 0;
  }

  .profile-tab div {
    display: flex;
    cursor: pointer;
    margin-right: 3rem;
    margin-top: -1.5rem;
    padding-top: 1.7rem;
  }

  .profile-tab span {
    margin-top: -6px;
    padding-left: 0.5rem;
    font-size:15px;
  }

  .profile-tab svg, .tagged {
    height: 15px;
    width: 15px;
  }

  hr {
    background-color: #fff;
    border:none;
    border-top: 1px solid #D3d3d3;
  }
`;

const Profile = () => {
  const [tab, setTab] = useState("POSTS");

  const { username } = useParams();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [deadend, setDeadend] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    client(`/users/${username}`)
      .then((res) => {
        setLoading(false);
        setDeadend(false);
        setProfile(res.data);
      })
      .catch((err) => setDeadend(true));
  }, [username]);

  if (!deadend && loading) {
    return <Loader />;
  }

  if (deadend) {
    return (
      <Placeholder
        title="Sorry, this page isn't available"
        text="The link you followed may be broken, or the page may have been removed"
      />
    );
  }
  document.title = `${profile?.fullname} (@${profile?.username})`
  return (
    <Wrapper>
      <ProfileHeader profile={profile} />
      <hr />

      <div className="profile-tab">
        <div
          style={{ color:tab === "POSTS" ? "#000" : "#d3d3d3", fontWeight: tab === "POSTS" ? "100" : "50", borderTop: tab==="POSTS"?"1px solid #000":""
         }}
          onClick={() => setTab("POSTS")}
        >
          <PostIcon />
          <span>POSTS</span>
        </div>
        
        {profile?.isMe?<div
          style={{ color:tab === "SAVED" ? "#000" : "#d3d3d3", fontWeight: tab === "SAVED" ? "500" : "", borderTop: tab==="SAVED"?"1px solid #000":"" }}
          onClick={() => setTab("SAVED")}
        >
          <SavedIcon />
          <span>SAVED</span>
        </div>:<div
          style={{ color:tab === "SAVED" ? "#000" : "#d3d3d3", fontWeight: tab === "SAVED" ? "500" : "", borderTop: tab==="SAVED"?"1px solid #000":"" }}
          onClick={() => setTab("SAVED")}
        >
          <img className="tagged" alt="..." src="https://cdn0.iconfinder.com/data/icons/instagram-ui-1/24/Instagram-UI_tagged-512.png"/>
          <span>Tagged</span>
        </div>}
      </div>

      {tab === "POSTS" && (
        <>
          {profile?.posts?.length === 0 ? (
            profile?.isMe?<div>
              <Placeholder
                title="Posts"
                text="Once you start making new posts, they'll appear here"
                icon="post"
              />
              <NewPost/>
              </div>:
              <Placeholder
                title="No Posts Yet"
                text=""
                icon="camera"
              />
            
 ) : (<div>
            <PostPreview posts={profile?.posts} />
            {profile?.isMe?
            <NewPost/>:""}
            </div>
          )}
        </>
      )}

      {tab === "SAVED" && (
        <>
          {profile?.savedPosts?.length === 0 ? (
           
              profile?.isMe?<Placeholder
              title="Saved"
              text="Save photos and videos that you want to see again"
              icon="bookmark"
            />:
            <Placeholder
              title="No Photos"
              text=""
              icon="tagged"
            />
          ) : (
            <PostPreview posts={profile?.savedPosts} />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Profile;
