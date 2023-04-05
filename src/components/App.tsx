import { ChangeEvent, useState, FC, useCallback } from "react";
import styled from "styled-components";
import { MemoList } from "./MemoList";

export const App: FC = () => {
  // テキストボックスState
  const [text, setText] = useState<string>("");
  // メモ一覧State
  const [memos, setMemos] = useState<string[]>([]);

  // テキストボックス入力時に入力内容をStateに変更
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)

  // [追加]ボタン押下時
  const onClickAdd = () => {
    // State変更を正常に検知させるため新たな配列を生成
    const newMemos = [...memos];
    // テキストボックスの入力内容をメモ配列に追加
    newMemos.push(text);
    setMemos(newMemos);
    // テキストボックスを空に
    setText("");
  }

  // [削除]ボタン押下時(何番目が押されたかを引数で受け取る)
  const onClickDelete = useCallback((index: number) => {
    // State変更を正常に検知させるため新たな配列を生成
    const newMemos = [...memos];
    // メモ配列から該当の要素を削除
    newMemos.splice(index, 1);
    setMemos(newMemos);
  }, [memos]);

  return (
    <div>
      <input type="text" value={text} onChange={onChangeText} />
      <SButton onClick={onClickAdd}>追加</SButton>
      <MemoList memos={memos} onClickDelete={onClickDelete} />
    </div>
  );
};

const SButton = styled.button`
  margin-left: 16px;
`;
