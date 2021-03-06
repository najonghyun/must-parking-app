import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import SearchListItem from "./SearchListItem";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

const SearchKeywordContainer = styled.ul`
  background-color: white;
  width: 50vw;
  height: 26.31579vh;
  overflow-y: scroll;
  top: 15.6vh;
  left: 31.5vw;
  z-index: 2;
  padding: 0.75rem;
  margin: 1.25rem;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  opacity: 0.9;
  border-radius: 8px;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #707070;
    border-radius: 8px;
  }
`;
const SearchMenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const CategoryBtn = styled.div`
  width: 7.77777vw;
  height: 3.68421vh;
  border-radius: 50%;
  box-shadow: 2px 2px 6px rgb(0 0 0 / 0.16);
`;
const SearchInputContainer = styled.div`
  width: 47.7vw;
  height: 3.68421vh;
  border-radius: 8px;
  padding: 0.5rem;
  font-size: 0.5rem;
  box-shadow: 2px 2px 6px rgb(0 0 0 / 0.16);
  background-color: white;
  justify-content: space-between;
  margin-left: 0.25rem;
`;

function SearchPage({ ps, setUserPosition }) {
  const [searchData, setSearchData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showKeyword, setShowKeyword] = useState(false);

  const onChangeKeyword = useCallback((e) => {
    setSearchKeyword(e.target.value);
  }, []);
  const placesSearchCB = useCallback((data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setSearchData(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  }, []);

  const searchPlaces = useCallback(() => {
    var keyword = searchKeyword;

    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }
    ps.current.keywordSearch(keyword, placesSearchCB);
  }, [placesSearchCB, ps, searchKeyword]);

  const onClickSearch = useCallback(() => {
    setShowKeyword(true);
    searchPlaces();
  }, [searchPlaces]);
  const onClickClose = useCallback(() => {
    setShowKeyword(false);
    setSearchKeyword("");
  }, []);
  return (
    <div>
      <SearchMenuContainer>
        <CategoryBtn
          style={{
            background: "linear-gradient(#F96363,#5069CB)",
          }}
        />
        <CategoryBtn
          style={{
            background: "#5069CB",
          }}
        />
        <CategoryBtn
          style={{
            background: "#F96363",
          }}
        />
        <SearchInputContainer className="flex">
          <input
            style={{
              width: "36vw",
            }}
            placeholder="이동할 위치를 입력해주세요."
            onChange={onChangeKeyword}
            value={searchKeyword}
          />
          <AiOutlineClose
            className="top-4 text-xs"
            style={{ display: `${searchKeyword === "" ? "none" : "flex"}` }}
            onClick={onClickClose}
          />
        </SearchInputContainer>
        <BiSearch
          style={{
            fontSize: "1.5rem",
            marginLeft: "0.25rem",
          }}
          onClick={onClickSearch}
        />
      </SearchMenuContainer>
      <SearchKeywordContainer
        style={{ display: `${showKeyword ? "flex" : "none"}` }}
      >
        {searchData.map((value, index) => (
          <SearchListItem
            key={index}
            parkingName={value.place_name}
            address={value.address_name}
            category={value.category_group_name}
            setUserPosition={setUserPosition}
          />
        ))}
      </SearchKeywordContainer>
    </div>
  );
}

export default SearchPage;
