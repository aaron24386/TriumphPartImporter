import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';

type StatusIntent = 'success' | 'error' | 'info';
type StatusMessageType = {
  text?: string;
  type?: 'success' | 'error' | 'info';
};

const inferIntent = (messagType: string): StatusIntent => {
  if (messagType.includes('error')) return 'error';
  if (messagType.includes('success')) return 'success';
  return 'info';
};

const stylesByIntent: Record<StatusIntent, { border: string; bg: string; dot: string; text: string }> = {
  success: {
    border: 'border-emerald-200',
    bg: 'bg-emerald-50/90',
    dot: 'bg-emerald-500',
    text: 'text-emerald-950',
  },
  error: {
    border: 'border-rose-200',
    bg: 'bg-rose-50/90',
    dot: 'bg-rose-500',
    text: 'text-rose-950',
  },
  info: {
    border: 'border-slate-200',
    bg: 'bg-white/90',
    dot: 'bg-sky-500',
    text: 'text-slate-900',
  },
};

const StatusMessage = ({ message }: { message?: StatusMessageType }) => {
  const { text: messageText, type: messageType } = message;
  if (!messageText) return null;

  const intent = inferIntent(messageType);
  const s = stylesByIntent[intent];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-50 flex justify-center px-3">
      <div
        role="status"
        aria-live="polite"
        className={[
          'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg ring-1 ring-black/5 backdrop-blur',
          s.border,
          s.bg,
          s.text,
        ].join(' ')}>
        <div className={['mt-1 h-2.5 w-2.5 shrink-0 rounded-full', s.dot].join(' ')} />
        <div className="min-w-0 flex-1 break-words">{messageText}</div>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(StatusMessage, <div> Loading ... </div>), <div> Error Occur </div>);
