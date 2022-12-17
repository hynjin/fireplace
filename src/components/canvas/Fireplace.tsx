import { GetServerSideProps } from "next";
import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";
import { fetcher, postFetcher } from "../../helper/Helper";
import useSWR from "swr";
import _ from "lodash";
import NextImage from "next/image";
import Bonfire from "./Bonfire";

type Props = {
  letters: LetterType[];
};

export default function Fireplace(props: Props) {
  const { letters } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fireplaceHeight = 621;
  const fireplaceWidth = 795;

  return (
    <div>
      <Bonfire />
    </div>
  );
}
