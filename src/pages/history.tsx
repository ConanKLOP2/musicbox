import GoBack from "@/components/shared/GoBack";
import styles from "@/styles/History.module.scss";
import {Button, Typography} from "antd";
import VerticalTracksList from "@/components/shared/VerticalTracksList";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faPlay, faTimes, faPlus} from "@fortawesome/free-solid-svg-icons";
import {setApp} from "@/redux/slices/app.slice";
import {enqueueTrack} from "@/redux/actions/player.actions";
import React, {useState} from "react";

export default function History() {
  const dispatch = useAppDispatch();
  const { playHistory } = useAppSelector(state => state.app);
  const [editing, setEditing] = useState(false);

  return <div className={styles.outer}>
    <div className={styles.header}>
      <div className={styles.controls}>
        <GoBack />
        <Button
          onClick={() => setEditing(!editing)}
          size={'large'}
          shape={editing ? 'round' : 'circle'}
          type={'text'}
          icon={<FontAwesomeIcon icon={editing ? faTimes : faPen} />}
        >
          {editing && "Cancel"}
        </Button>
      </div>
      <Typography.Title>
        History
      </Typography.Title>
    </div>

    <VerticalTracksList
      tracks={playHistory}
      showFavorite={true}
      editing={editing}
      optionItems={[{
        key: 'add-to-playlist',
        label: 'Add to playlist',
        icon: <FontAwesomeIcon icon={faPlus} />,
        onClick: (item: any) => {
          dispatch(setApp({
            addToPlaylistModal: {
              showModal: true,
              track: item,
            },
          }));
        }
      }, {
        key: 'enqueue',
        label: 'Add to queue',
        icon: <FontAwesomeIcon icon={faPlay} />,
        onClick: (item: any) => {
          dispatch(enqueueTrack({
            track: item,
            playNow: false,
          }));
        }
      }]}
    />
  </div>
}
