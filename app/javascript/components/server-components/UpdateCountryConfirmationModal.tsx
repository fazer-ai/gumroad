import * as React from "react";
import { createCast } from "ts-safe-cast";

import { register } from "$app/utils/serverComponentUtil";

import { Button } from "$app/components/Button";
import { Modal } from "$app/components/Modal";

type Props = {
  country: string;
  balance: string | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const UpdateCountryConfirmationModal = ({ country, balance, open, onClose, onConfirm }: Props) => {
  const [confirmText, setConfirmText] = React.useState("");
  const isConfirmEnabled = !balance || confirmText.trim().toLowerCase() === "i understand";

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        title="Confirm country change"
        footer={
          <>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onConfirm} color={balance ? "danger" : "primary"} disabled={!isConfirmEnabled}>
              Confirm
            </Button>
          </>
        }
      >
        <h4>
          {balance ? (
            <>
              Due to limitations with our payments provider, switching your country to <b>{country}</b> means that you
              will have to forfeit your remaining balance of <b>{balance}</b>.<br />
              <br />
              Please confirm that you're okay forfeiting your balance by typing <b>"I understand"</b> below and clicking{" "}
              <b>Confirm</b>.
              <div className="mt-4">
                <label htmlFor="confirmation-input" className="sr-only">
                  Type "I understand" to confirm
                </label>
                <input
                  id="confirmation-input"
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="I understand"
                  className="border-gray-300 w-full rounded border p-2"
                />
              </div>
            </>
          ) : (
            'You are about to change your country. Please click "Confirm" to continue.'
          )}
        </h4>
      </Modal>
    </div>
  );
};

export default register({ component: UpdateCountryConfirmationModal, propParser: createCast() });
