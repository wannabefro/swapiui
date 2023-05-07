"use client";
import { useState, FormEvent } from "react";
import Downshift from "downshift";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { searchByName } from "./utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type Suggestion = {
  name: string;
  url: string;
};

type SearchProps = {
  suggestions: Suggestion[];
};

const Search = ({ suggestions }: SearchProps) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${inputValue}`);
  };

  const clearInput = () => {
    setInputValue("");
  };

  const navigateTo = (url: string) => {
    router.push(url);
  };

  return (
    <div className="flex items-center justify-center px-4 w-full relative top-0">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md">
        <Downshift
          inputValue={inputValue}
          onInputValueChange={(value) => setInputValue(value)}
          onSelect={(item) => (item ? navigateTo(item.url) : setInputValue(""))}
          itemToString={(item) => (item ? item.name : "")}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
          }) => {
            const filteredItems = searchByName(suggestions, inputValue);
            return (
              <div className="relative">
                <form
                  className="search-input-wrapper"
                  method="get"
                  action="/search"
                  onSubmit={handleSearch}
                >
                  <input
                    {...getInputProps({
                      name: "q",
                      placeholder: "Search by title...",
                      className: "search-input",
                    })}
                  />
                  {inputValue && (
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      type="button"
                      onClick={clearInput}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  )}
                  <button
                    className="text-gray-500 hover:text-gray-700 mr-2"
                    type="submit"
                  >
                    <MagnifyingGlassIcon className="h-6 w-6" />
                  </button>
                </form>
                <ul
                  {...getMenuProps({
                    className: classNames("suggestions-list", {
                      visible: isOpen && filteredItems.length,
                    }),
                  })}
                >
                  {isOpen &&
                    filteredItems.map((item, index) => (
                      <Link href={item.url} key={item.name}>
                        <li
                          {...getItemProps({
                            item,
                            index,
                            className: classNames("cursor-pointer py-2 px-4", {
                              "bg-gray-100": highlightedIndex === index,
                              "bg-gray-200": selectedItem === item,
                            }),
                          })}
                        >
                          {item.name}
                        </li>
                      </Link>
                    ))}
                </ul>
              </div>
            );
          }}
        </Downshift>
      </div>
    </div>
  );
};

export { Search };
