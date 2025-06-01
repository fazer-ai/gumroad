import * as React from "react";
import { useTranslation } from "react-i18next";

import { renewPassword } from "$app/data/login";
import { assertResponseError } from "$app/utils/request";

import { SocialAuth } from "$app/components/Authentication/SocialAuth";
import { Button } from "$app/components/Button";
import { showAlert } from "$app/components/server-components/Alert";

type SaveState = { type: "initial" | "submitting" } | { type: "error"; message: string };

export const ForgotPasswordForm = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation('authentication');
  const uid = React.useId();
  const [email, setEmail] = React.useState("");
  const [saveState, setSaveState] = React.useState<SaveState>({ type: "initial" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaveState({ type: "submitting" });
    try {
      await renewPassword(email);
      showAlert(t("forgot_password.password_reset_sent"), "success");
      setSaveState({ type: "initial" });
    } catch (e) {
      assertResponseError(e);
      setSaveState({ type: "error", message: e.message });
    }
  };

  return (
    <form onSubmit={(e) => void handleSubmit(e)}>
      <SocialAuth />
      <div role="separator">
        <span>{t("forgot_password.or")}</span>
      </div>
      <section>
        {saveState.type === "error" ? (
          <div role="alert" className="danger">
            {saveState.message}
          </div>
        ) : null}
        <fieldset>
          <legend>
            <label htmlFor={uid}>{t("forgot_password.email_label")}</label>
          </legend>
          <input id={uid} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </fieldset>
        <Button color="primary" type="submit" disabled={saveState.type === "submitting"}>
          {saveState.type === "submitting" ? t("forgot_password.sending") : t("forgot_password.send")}
        </Button>
        <Button onClick={onClose}>{t("forgot_password.cancel")}</Button>
      </section>
    </form>
  );
};
