import React, { PureComponent } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import {
  getToken,
  isFunction,
  logTrace,
  pretreatmentRemoteSingleData,
  showSimpleErrorNotification,
} from 'easy-soft-utility';

import { getCorsDomain, getTokenName } from 'antd-management-fast-common';

const primaryCallName = 'components::Editor::TinymceWrapper';

const commonPluginList = [
  'advlist',
  'anchor',
  'autolink',
  'autosave',
  'charmap',
  'charmap',
  'code',
  'codesample',
  'directionality',
  'emoticons',
  'fullscreen',
  'help',
  'image',
  'importcss',
  'insertdatetime',
  'link',
  'lists',
  'media',
  'nonbreaking',
  'pagebreak',
  'preview',
  'quickbars',
  'save',
  'searchreplace',
  'table',
  'visualblocks',
  'visualchars',
  'wordcount',
];

function buildPluginList({ autoresize = false }) {
  const list = [];

  if (autoresize) {
    list.push('autoresize');
  }

  return [...commonPluginList, ...list];
}

class TinymceWrapper extends PureComponent {
  editor = React.createRef();

  buildConfig = () => {
    const { language, initConfig } = this.props;

    const { autoresize } = { autoresize: false, ...initConfig };

    const plugins = buildPluginList({ autoresize }).join(' ');

    const config = {
      language: language || '',
      height: 690,
      // plugins_ignore:
      //   'tinydrive powerpaste imagetools advcode formatpainter pageembed permanentpen casechange checklist advtable export tinymcespellchecker linkchecker mentions tinycomments toc',
      plugins: plugins,
      mobile: {
        plugins: plugins,
      },
      menu: {
        tc: {
          title: 'Comments',
          items: 'addcomment showcomments deleteallconversations',
        },
      },
      menubar: 'file edit view insert format tools table tc help',
      toolbar:
        'undo redo bold italic underline strikethrough fontselect fontsizeselect formatselect alignleft aligncenter alignright alignjustify outdent indent numlist bullist forecolor backcolor  removeformat visualblocks visualchars table tabledelete tableprops tablerowprops tablecellprops tableinsertrowbefore tableinsertrowafter tabledeleterow tableinsertcolbefore tableinsertcolafter tabledeletecol searchreplace pagebreak nonbreaking charmap emoticons fullscreen  preview wordcount save insertdatetime insertfile image media link anchor codesample code ltr rtl showcomments addcomment restoredraft help',
      autosave_ask_before_unload: true,
      autosave_interval: '30s',
      autosave_prefix: '{path}{query}-{id}-',
      autosave_restore_when_empty: false,
      autosave_retention: '2m',
      image_advtab: true,
      // link_list: [],
      // image_list: [],
      // 启用image_class_list 配置后,该值不能为空数组，否则将发生错误
      // image_class_list: ['image'],
      importcss_append: true,
      image_caption: true,
      quickbars_selection_toolbar:
        'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
      noneditable_noneditable_class: 'mceNonEditable',
      toolbar_mode: 'sliding',
      // spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
      // tinycomments_mode: 'embedded',
      content_style: '.mymention{ color: gray; }',
      // contextmenu_ignore: 'imagetools configurepermanentpen',
      contextmenu: 'link image table',
      a11y_advanced_options: true,
      skin: 'oxide',
      content_css: 'default',
      // mentions_selector: '.mymention',
      // mentions_item_type: 'profile',
      automatic_uploads: true,
      images_upload_url: '',
      // min_height: 700,
      toolbar_sticky: false,
      images_upload_handler: this.imageUploadHandler,
      ...initConfig,
    };

    logTrace(config, [primaryCallName, 'buildConfig']);

    return config;
  };

  imageUploadHandler = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      const { imagesUploadUrl } = this.props;
      const corsUrl = getCorsDomain();

      const images_upload_url = `${corsUrl}${imagesUploadUrl}`;

      let xhr, formData;

      xhr = new XMLHttpRequest();

      xhr.withCredentials = false;
      xhr.open('POST', images_upload_url);

      xhr.setRequestHeader(getTokenName(), getToken() || 'anonymous');

      xhr.upload.addEventListener('progress', function (event) {
        progress((event.loaded / event.total) * 100);
      });

      xhr.addEventListener('load', function () {
        if (xhr.status === 403) {
          reject({ message: 'HTTP Error: ' + xhr.status, remove: true });

          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject('HTTP Error: ' + xhr.status);

          return;
        }

        let json = {};

        try {
          json = JSON.parse(xhr.responseText);
        } catch {
          reject(`图片上传失败, 返回数据非Json格式, 请检查`);

          showSimpleErrorNotification(xhr.responseText);

          return;
        }

        const v = pretreatmentRemoteSingleData({ source: json });

        const { dataSuccess } = v;

        if (!dataSuccess) {
          reject(
            `图片上传失败，请确认上传地址有效可用,当前上传地址为: ${images_upload_url}`,
          );

          return;
        }

        const {
          data: { imageUrl },
        } = v;

        resolve(imageUrl || '');
      });

      // eslint-disable-next-line unicorn/prefer-add-event-listener
      xhr.onerror = function () {
        reject('图片上传失败，请确认上传地址有效可用. Code: ' + xhr.status);
      };

      formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    });

  handleEditorChange = (newValue, editor) => {
    const { afterChange } = this.props;

    if (isFunction(afterChange)) {
      afterChange({
        html: editor.getContent(),
        text: editor.getContent({ format: 'text' }),
      });
    }
  };

  render() {
    const { scriptSrc, apiKey, content } = this.props;

    return (
      <div
        style={{
          border: '0px solid #ccc',
        }}
      >
        <Editor
          tinymceScriptSrc={scriptSrc || ''}
          apiKey={apiKey}
          onInit={(event_, editor) => (this.editor.current = editor)}
          initialValue={content}
          init={this.buildConfig()}
          onEditorChange={this.handleEditorChange}
        />
      </div>
    );
  }
}

TinymceWrapper.defaultProps = {
  scriptSrc: '',
  apiKey: '',
  language: '',
  content: '',
  initConfig: null,
  autoresize: false,
  imagesUploadUrl: '',
};

export { TinymceWrapper };
