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

  // commented throttled function as now we are not calling api as we have created a
  // custom mimic function to generate users

  useEffect(() => {
    const handleScroll = () => {
      // when we reach the bottom of the page, we want to fetch more users
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
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
