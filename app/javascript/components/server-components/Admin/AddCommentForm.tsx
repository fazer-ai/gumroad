import * as React from "react";
import { createCast } from "ts-safe-cast";
import { useTranslation } from "react-i18next";

import { register } from "$app/utils/serverComponentUtil";

import { Form } from "$app/components/Admin/Form";
import { showAlert } from "$app/components/server-components/Alert";

export const AdminAddCommentForm = ({
  commentable_id,
  commentable_type,
}: {
  commentable_id: number;
  commentable_type: string;
}) => {
  const { t } = useTranslation('common');
  return (
  <Form
    url={Routes.admin_comments_path()}
    method="POST"
    confirmMessage="Are you sure you want to post this comment?"
    onSuccess={() => showAlert(t("actions.successfully_added_comment"), "success")}
  >
    {(isLoading) => (
      <fieldset>
        <div className="input-with-button">
          <textarea name="comment[content]" rows={1} placeholder={`Comment on this ${commentable_type}`} required />
          <input type="hidden" name="comment[commentable_id]" value={commentable_id} />
          <input type="hidden" name="comment[commentable_type]" value={commentable_type} />
          <input type="hidden" name="comment[comment_type]" value="note" />
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? "Saving..." : "Add comment"}
          </button>
        </div>
      </fieldset>
    )}
  </Form>
  );
};

export default register({ component: AdminAddCommentForm, propParser: createCast() });
