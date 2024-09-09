import { useEffect, useState } from "react";
import { CardList } from "../components/CardList";
import { mimicUser } from "../Api/mimicUser";
import { throttle } from "lodash";

export const ShimmerUi = () => {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const newUsers = await mimicUser();

      setMonsters((users) => {
        setLoading(false);
        return [...users, ...newUsers];
      });
    };

    getUsers();
  }, [offset]);

  useEffect(() => {
    const handleScroll = () => {
      // when we reach the bottom of the page, we want to fetch more users
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        setOffset((prevOffset) => prevOffset + 1);
      }
    };
    // throttling the handleScroll function to avoid calling it too many times
    const throttledHandleScroll = throttle(handleScroll, 500);
    // we are binding on scroll event to the document
    document.addEventListener("scroll", throttledHandleScroll);

    return () => {
      document.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  // shimmer ui  will show up when loading is true
  return (
    <>
      <CardList monsters={monsters} isShimmerUi isLoading={loading} />
    </>
  );
};
