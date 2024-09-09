import { useEffect, useState } from "react";
import { CardList } from "../components/CardList";
// import { throttle } from "lodash";
import { mimicUser } from "../Api/mimicUser";

export const InfiniteScroll = () => {
  const [monsters, setMonsters] = useState([]);
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    const getUsers = async () => {
      const newUsers = await mimicUser(offset);

      setMonsters((users) => {
        return [...users, ...newUsers];
      });
    };
    getUsers();
  }, [offset]);

  useEffect(() => {
    const handleScroll = () => {
      console.log("scroll called");
      // when we reach the bottom of the page, we want to fetch more users
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        console.log("reached bottom of page");

        setOffset((prevOffset) => prevOffset + 1);
      }
    };
    // throttling the handleScroll function to avoid calling it too many times
    // const throttledHandleScroll = throttle(handleScroll, 500);
    // we are binding on scroll event to the document
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <CardList monsters={monsters} />;
};
