import { useState } from "react";
import { AddButton } from "./AddButton";
import { Section } from "./SectionBuilder";
export function ShareSection({inputTaskId, inputTaskList, setShareVisible}) {
    const [taskId, setTaskId] = useState(inputTaskId || "");
    const [taskList, setTaskList] = useState(inputTaskList|| "");
  function shareClick(socialPlatform) {
    let shareUrl;
    console.log("Тяжесть бытия")
    console.log(socialPlatform);
    console.log(taskId);
    const targetTask = taskList.find((task) => task.id == taskId);
    console.log(targetTask.title);
    const encodedStart = encodeURIComponent(
      "Делитесь своими бессмысленными заметками вместе с нами!"
    );
    const encodedHeader = encodeURIComponent(targetTask.title);
    const encodedDescription = encodeURIComponent(targetTask.description);
    const encodedCloser = encodeURIComponent(
      "Stradalets зачем-то добавил эту функциональность в свою лабораторную работу. Вот ему делать нечего..."
    );
    switch (socialPlatform) {
      case "copy":
        navigator.clipboard.writeText(
          targetTask.title + " " + targetTask.description
        );
        break;
      case "vk":
        shareUrl =
          "https://vk.com/share.php?text=" +
          encodedHeader +
          "%20" +
          encodedDescription; //Оно не работает, т.к. поле комментария пустое. Я старался
        break;
      case "tg":
        console.log("Попал в телеграм");
        shareUrl =
          "https://t.me/share/url?url=" +
          encodedStart +
          "&text=" +
          encodedHeader +
          " " +
          encodedDescription +
          "%0A" +
          encodedCloser;
        break;
      case "wp":
        shareUrl =
          "https://api.whatsapp.com/send?text=" +
          encodedHeader +
          "%20" +
          encodedDescription;
        break;
      case "fc":
        shareUrl =
          "https://www.facebook.com/sharer/sharer.php?u=" +
          encodedHeader +
          "&quote=" +
          encodedDescription;
        break;
      default:
        return;
    }
    if (socialPlatform != "copy") {
      window.open(shareUrl, "_blank");
    } else {
    }

    setShareVisible((prev) => !prev);
  }
  return (
    <Section className={"share_window"}>
      <AddButton
        id="copy"
        className="button_share"
        content={
          <img src="src/assets/vector/copy.svg" alt="Копировать заметку" />
        }
        onClick={(event) => shareClick(event.currentTarget.id)}
      ></AddButton>
      <AddButton
        id="vk"
        className="button_share"
        content={<img src="src/assets/vector/vk.svg" alt="Поделиться в VK" />}
        onClick={(event) => shareClick(event.currentTarget.id)}
      ></AddButton>
      <AddButton
        id="tg"
        className="button_share"
        content={
          <img
            src="src/assets/vector/telegram.svg"
            alt="Поделиться в Telegram"
          />
        }
        onClick={(event) => shareClick(event.currentTarget.id)}
      ></AddButton>
      <AddButton
        id="wp"
        className="button_share"
        content={
          <img
            src="src/assets/vector/whatsapp.svg"
            alt="Поделиться в Whatsapp"
          />
        }
        onClick={(event) => shareClick(event.currentTarget.id)}
      ></AddButton>
      <AddButton
        id="fb"
        className="button_share"
        content={
          <img
            src="src/assets/vector/facebook.svg"
            alt="Поделиться в Facebook"
          />
        }
        onClick={(event) => shareClick(event.currentTarget.id)}
      ></AddButton>
    </Section>
  );
}
