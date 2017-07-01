import MessageFormat from 'messageformat';

export default function(props) {
    const { template, lang = 'en', ...rest } = props || {};
    return template && new MessageFormat(lang).compile(template)(rest);
}
