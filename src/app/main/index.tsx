import { css } from "@emotion/react";
import { fadeIn } from "@/style/keyframe.ts";
import { Fragment, useEffect, useRef, useState } from "react";
import ContentBox from "@/component/common/ContentBox.tsx";

import Add from "@/assets/img/add.svg?react";

// import ball from "@/assets/3d/character/ball.png";
// import creature from "@/assets/3d/character/creature.png";
// import donut from "@/assets/3d/character/donut.png";
// import flower from "@/assets/3d/character/flower.png";
// import fuzz from "@/assets/3d/character/fuzz.png";
// import heart from "@/assets/3d/character/heart.png";
// import star from "@/assets/3d/character/star.png";

import TodoList from "@/component/main/TodoList.tsx";
import CompleteList from "@/component/main/CompleteList.tsx";
import "react-calendar/dist/Calendar.css";
import "moment/locale/ko";
import { Beforeunload } from "react-beforeunload";
import NotDataWithContentBox from "@/component/common/NotDataWithContentBox.tsx";
import StatusBar from "@/component/main/StatusBar.tsx";

export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];
export interface agendaProps {
  id: number;
  content: string;
}
export default function Main() {
  const [complete, setComplete] = useState<agendaProps[]>((JSON.parse(localStorage.getItem("REWORK_COMPLETE") as string) as agendaProps[]) ?? []);
  const [todo, setTodo] = useState<agendaProps[]>((JSON.parse(localStorage.getItem("REWORK_TODO") as string) as agendaProps[]) ?? []);

  const [focus, setFocus] = useState(false);

  // const CHARACTER_LIST = [ball, creature, donut, flower, fuzz, heart, star];
  const todoRef = useRef(null);

  useEffect(() => {
    if (todoRef.current) {
      const inputNodes = (todoRef.current as HTMLDivElement)?.querySelectorAll("#todo");
      for (let i = 0; i < inputNodes.length; i++) {
        const input = inputNodes[i] as HTMLInputElement;
        if (input.value === "") {
          setFocus(true);
          return input.focus();
        }
      }
      setFocus(false);
    }
  }, [todo]);

  useEffect(() => {
    localStorage.setItem("REWORK_TODO", JSON.stringify(todo));
  }, [todo]);

  useEffect(() => {
    localStorage.setItem("REWORK_COMPLETE", JSON.stringify(complete));
  }, [complete]);

  return (
    <Fragment>
      {
        <Beforeunload
          onBeforeunload={(event: BeforeUnloadEvent) => {
            event.preventDefault();
            alert("창이 종료되었어요!");
          }}
        />
      }
      <section
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          row-gap: 8.5rem;

          margin: 0 auto;
          padding: 6rem;
        `}
      >
        {/* TODO: 메인 페이지 구성 필요 */}
        {
          <article
            css={css`
              width: 100%;
              animation: ${fadeIn} 0.7s;
              display: flex;
              flex-direction: column;
              row-gap: 7rem;
            `}
          >
            <div
              css={css`
                display: grid;
                grid-template-columns: 1fr 1fr;
                column-gap: 2.2rem;
                row-gap: 3.1rem;
              `}
            >
              <ContentBox
                title="오늘의 아젠다"
                length={todo.length}
                subscribe="오늘의 아젠다를 선정하고 성장해보세요"
                util={
                  <Add
                    css={css`
                      margin-left: auto;
                      cursor: pointer;
                      pointer-events: ${focus && "none"};
                    `}
                    width={20}
                    height={20}
                    onClick={() => {
                      if (todo.length < 1 || todo[0].content !== "") {
                        setTodo([{ id: todo.length + complete.length, content: "" }, ...todo]);
                      } else {
                        setTodo(todo.filter((todo) => todo.content !== ""));
                      }
                    }}
                  />
                }
              >
                {todo.length ? (
                  <TodoList completeList={complete} setComplete={setComplete} todoList={todo} setTodo={setTodo} setFocus={setFocus} ref={todoRef} />
                ) : (
                  <NotDataWithContentBox> 오늘 생성된 아젠다가 존재하지 않습니다 </NotDataWithContentBox>
                )}
              </ContentBox>
              <ContentBox title="완료된 아젠다" subscribe="오늘 내가 완료한 아젠다를 확인할 수 있어요" length={complete.length}>
                {complete.length ? (
                  <CompleteList completeList={complete} setComplete={setComplete} todoList={todo} setTodo={setTodo} />
                ) : (
                  <NotDataWithContentBox> 아직 완료된 아젠다가 존재하지 않습니다 </NotDataWithContentBox>
                )}
              </ContentBox>
            </div>
            <StatusBar completeList={complete} todoList={todo} />
          </article>
        }
      </section>
    </Fragment>
  );
}
