import cx from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "$app/components/Button";
import { useState, getErrors } from "$app/components/Checkout/payment";
import { Icon } from "$app/components/Icons";
import { Modal } from "$app/components/Modal";

export const GiftForm = ({ isMembership }: { isMembership: boolean }) => {
  const { t } = useTranslation('checkout');
  const giftEmailUID = React.useId();
  const giftNoteUID = React.useId();
  const [cancellingPresetGift, setCancellingPresetGift] = React.useState(false);

  const [state, dispatch] = useState();
  const { gift } = state;
  const hasError = getErrors(state).has("gift");

  return (
    <div className="flex flex-col">
      <label className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <Icon name="gift-fill" className="mr-2" />
          <h4>{t("gift.give_as_gift")}</h4>
        </div>
        <input
          type="checkbox"
          role="switch"
          checked={!!gift}
          onChange={(e) => {
            if (gift?.type === "anonymous") {
              e.preventDefault();
              setCancellingPresetGift(true);
            } else {
              dispatch({ type: "set-value", gift: gift ? null : { type: "normal", email: "", note: "" } });
            }
          }}
        />
      </label>

      {gift ? (
        <div className="paragraphs w-full">
          {isMembership ? (
            <div role="alert" className="info">
              <div>
                {t("gift.membership_note")}
              </div>
            </div>
          ) : null}
          {gift.type === "normal" ? (
            <fieldset className={cx({ danger: hasError })}>
              <legend>
                <label htmlFor={giftEmailUID}>{t("gift.recipient_email")}</label>
              </legend>
              <input
                id={giftEmailUID}
                type="email"
                value={gift.email}
                onChange={(evt) => dispatch({ type: "set-value", gift: { ...gift, email: evt.target.value } })}
                placeholder={t("gift.recipient_email_address")}
                aria-invalid={hasError}
                className="w-full"
              />
            </fieldset>
          ) : (
            <div role="alert" className="info">
              <div>
                {t("gift.email_hidden", { name: gift.name })}{" "}
                <button className="link" onClick={() => setCancellingPresetGift(true)}>
                  {t("gift.cancel_gift_option")}
                </button>
              </div>
              <Modal
                open={cancellingPresetGift}
                onClose={() => setCancellingPresetGift(false)}
                footer={
                  <>
                    <Button onClick={() => setCancellingPresetGift(false)}>{t("gift.no_cancel")}</Button>
                    <Button
                      color="primary"
                      onClick={() => {
                        dispatch({ type: "set-value", gift: null });
                        setCancellingPresetGift(false);
                      }}
                    >
                      {t("gift.yes_reset")}
                    </Button>
                  </>
                }
                title={t("gift.reset_gift_option")}
              >
                {t("gift.switch_off_gift")}
              </Modal>
            </div>
          )}
          <fieldset className="w-full">
            <legend>
              <label htmlFor={giftNoteUID}>{t("gift.message")}</label>
            </legend>
            <textarea
              id={giftNoteUID}
              value={gift.note}
              onChange={(evt) => dispatch({ type: "set-value", gift: { ...gift, note: evt.target.value } })}
              placeholder={t("gift.personalized_message")}
              className="w-full"
            />
          </fieldset>
        </div>
      ) : null}
    </div>
  );
};
