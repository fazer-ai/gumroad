import * as React from "react";
import { createCast } from "ts-safe-cast";
import { useTranslation } from "react-i18next";

import { register } from "$app/utils/serverComponentUtil";

import { Form } from "$app/components/Admin/Form";
import { showAlert } from "$app/components/server-components/Alert";

export const MassTransferPurchasesForm = ({ user_id }: { user_id: number }) => {
  const { t } = useTranslation('common');
  return (
    <Form
      url={Routes.mass_transfer_purchases_admin_user_path(user_id)}
      method="POST"
      confirmMessage="Are you sure you want to Mass Transfer purchases for this user?"
      onSuccess={() => showAlert(t("actions.successfully_transferred_purchases"), "success")}
  >
    {(isLoading) => (
      <fieldset>
        <div style={{ display: "grid", gap: "var(--spacer-3)", gridTemplateColumns: "1fr auto" }}>
          <input type="email" name="mass_transfer_purchases[new_email]" placeholder="New email" required />
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? "Transferring..." : "Transfer"}
          </button>
        </div>
        <small>Are you sure you want to Mass Transfer purchases for this user?</small>
      </fieldset>
    )}
    </Form>
  );
};

export default register({ component: MassTransferPurchasesForm, propParser: createCast() });
