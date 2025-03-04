import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const sx = { fontSize: 20, cursor: "pointer" };

export default function BotActions() {
    return <>
        <div className="actions">
            <ContentCopyIcon sx={sx} />
            <ThumbUpIcon sx={sx} />
            <ThumbDownAltIcon sx={sx} />
        </div>
    </>
}